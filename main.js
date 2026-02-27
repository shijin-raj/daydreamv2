var subColors = [];
var sourceImageDimensions = { width: 500, height: 500 }; // Store actual source image dimensions

$(document).ready(() => {
  $("input").val("");

  setDefaults();

  let options = { btnText: 'Choose an image', btnAction: () => { triggerFileInput('sourceInput') } };
  $('#previewSource').html('');
  $('#previewSubSource').html('');
  createImageBox('previewSource', 'assets/gallery.png', 'srcPreview', options);
  options = { btnText: 'Choose multiple images', btnAction: () => { triggerFileInput('sourceSubInput') } };
  createImageBox('previewSubSource', 'assets/gallery.png', 'subSrcPreview', options);

  $("#blockSize").on("input", (e) => {
    if (e.target.value < 5) {
      $("#blockSize").val(5);
    }
    $(`#sliderVal`).text($("#blockSize").val());
  });
  $("#downloadBtn").on("click", (e) => {
    let link = document.createElement("a");
    link.href = document.getElementById("outputCanvas").toDataURL();
    link.download = "DayDream.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  $("#btnRender").on("click", (e) => {
    let btnElement = $("#btnRender");

    if (subColors.length < 1) {
      alert("Please choose background image and atleast one sub image!")
      return;
    }

    btnElement.prop("disabled", true);
    btnElement.text("Rendering...");
    $(`#outputLoader`).removeClass("hidden");
    setTimeout(() => {
      processImage(() => {
        btnElement.prop("disabled", false);
        btnElement.text("Render");

        $(`#sourceContainer`).removeClass("hidden");
        $(`#outputLoader`).addClass("hidden");
        renderPreview(document.getElementById("outputCanvas"));
      });
    }, 100);
  });
});

function createImageBox(containerId, dataURL, id, options = null) {
  let btnText = (options && options.btnText) ? options.btnText : 'Change image';
  let btnAction = (options && options.btnAction) ? options.btnAction : null;
  let imgBoxParentEl = $('<div>', {
    id: `${id}`,
    class: 'image-box m-3',
  });
  imgBoxParentEl.css('background-image', `url('${dataURL}')`);
  imgBoxParentEl.css('background-size', 'cover');
  if (id == 'srcPreview' || id == 'subSrcPreview') {
    let imgBoxEl = $('<div>', {
      class: 'img-button',
    });
    imgBoxEl.text(btnText);
    imgBoxEl.on('click', btnAction);
    imgBoxParentEl.append(imgBoxEl);
  }
  $(`#${containerId}`).append(imgBoxParentEl);
}

function triggerFileInput(sourceInputId) {
  $(`#${sourceInputId}`).trigger('click');
}

function readMultipleFiles(input) {
  $(`#source`).html("");
  subColors = [];
  if (input.files && input.files[0]) {
    let count = input.files.length;
    for (let i = 0; i < count; i++) {
      var reader = new FileReader();

      reader.onload = function (e) {
        let div = document.createElement("div");
        let imgEl = $("<img>", {
          id: `img_${i + 1}`,
          class: "sub-image",
          alt: "img",
          src: e.target.result,
          crossorigin: "anonymous",
          style: "width: 500px; height: 500px; object-fit: cover;"
        });
        imgEl.on("load", () => {
          calculateSubColor(imgEl);
        });
        console.log(imgEl);
        $(div).html(imgEl);
        $(`#source`).append(div);
        createImageBox('previewSubSource', e.target.result, `prev_img_${i + 1}`);
      };

      reader.readAsDataURL(input.files[i]);
    }
  }
}

function readURL(input, output = "i", preview = "previewSource") {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      let img = new Image();
      img.onload = function() {
        // Store the actual image dimensions
        sourceImageDimensions = { width: img.width, height: img.height };
        console.log('Source image dimensions:', sourceImageDimensions);
      };
      img.src = e.target.result;
      
      $(`#${output}`).attr("src", e.target.result);
      $('#previewSource').html('');
      let options = { btnText: 'Change image', btnAction: () => { triggerFileInput('sourceInput') } };
      createImageBox('previewSource', e.target.result, "prev_source_img", options);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function calculateSubColor(imgEl) {
  let imgId = imgEl.attr("id");
  let rgb = getAverageRGB(
    document.getElementById(imgId),
    0,
    0,
    imgEl.width()
  );
  let itemIndex = subColors.findIndex(
    (item) => item.r === rgb.r && item.g === rgb.g && item.b === rgb.b
  );
  if (itemIndex < 0) {
    rgb.id = imgId;
    rgb.colorVal = getColorVal(rgb);
    subColors.push(rgb);
    subColors = [...new Set(subColors)];
    console.log(subColors, itemIndex);
  }
  let div = `<div class="align-self-end shadow mb-2 rounded" style="background:rgb(${rgb.r},${rgb.g},${
    rgb.b
  });width:20px;height:20px" id="clr_${imgId}"></div>`;
  $(`#clr_${imgId}`).remove();
  imgEl.after(div);
  $(`#prev_${imgId}`).append(div);
}

function getColorVal(rgb) {
  let r = parseFloat(rgb.r * 0.2126);
  let g = parseFloat(rgb.g * 0.7152);
  let b = parseFloat(rgb.b * 0.0722);
  return parseFloat(r + g + b);
}

function outputImage(rgbProps) {
  let params = parseInputs();

  let maxHeight = params.imgHeight - params.blockSize;
  let maxWidth = params.imgWidth - params.blockSize;
  let positionI = 0;
  var canvas = document.getElementById("outputCanvas");
  var context = canvas.getContext && canvas.getContext("2d");
  for (let i = 0; i < params.gridRows; i++) {
    let positionJ = 0;
    for (let j = 0; j < params.gridCols; j++) {
      let rgb = rgbProps[i][j];
      if (rgb) {
        if (subColors.length > 0) {
          let colorVal = getColorVal(rgb);
          let min = Math.abs(colorVal - subColors[0].colorVal);
          let match = subColors[0];
          subColors.forEach((item) => {
            let diff = Math.abs(colorVal - item.colorVal);
            if (diff < min) {
              min = diff;
              match = item;
            }
          });
          if (match) {
            var img = document.getElementById(match.id);
            context.drawImage(
              img,
              0,
              0,
              500,
              500,
              positionJ,
              positionI,
              params.blockSize * 10,
              params.blockSize * 10
            );
          }
        }
      }
      positionJ += params.blockSize * 10;
    }
    positionI += params.blockSize * 10;
  }
}

function setDefaults() {
  $("#blockSize").val(20);
  $("#sliderVal").text(5);
}

function processImage(callback = null) {
  // Create canvas with dynamic dimensions based on actual source image size
  let canvas = document.getElementById("outputCanvas");
  canvas.width = sourceImageDimensions.width * 10;
  canvas.height = sourceImageDimensions.height * 10;
  console.log('Canvas created with dimensions:', canvas.width, 'x', canvas.height);
  
  extractRGB().then((data) => {
    outputImage(data);
    if (callback) {
      callback();
    }
  });
}

function parseInputs() {
  blockSize = 10;
  if (blockSize < 5) {
    blockSize = 5;
    $("#blockSize").val(blockSize);
  }

  // Use actual source image dimensions instead of hardcoded 500x500
  let imgWidth = sourceImageDimensions.width;
  let imgHeight = sourceImageDimensions.height;
  let gridRows = ~~(imgHeight / blockSize);
  let gridCols = ~~(imgWidth / blockSize);

  return {
    blockSize,
    imgWidth,
    imgHeight,
    gridRows,
    gridCols,
  };
}

function extractRGB(imageId = "i") {
  return new Promise((resolve, reject) => {
    let rgbProps = [];
    let params = parseInputs();
    let imgElem = document.getElementById(`${imageId}`);
    let maxHeight = params.imgHeight - params.blockSize;
    let maxWidth = params.imgWidth - params.blockSize;
    for (let i = 0; i <= maxHeight; i += params.blockSize) {
      let row = [];
      for (let j = 0; j <= maxWidth; j += params.blockSize) {
        // For dynamic source images, sample the actual dimensions
        let rgb = getAverageRGB(imgElem, j, i, params.blockSize);
        row.push(rgb);
      }
      rgbProps.push(row);
    }
    if (rgbProps.length > 0) {
      resolve(rgbProps);
    } else {
      reject([]);
    }
  });
}

function getAverageRGB(imgEl, sx = 0, sy = 0, blockSize = 5) {
  var gridSize = 5;
  var defaultRGB = {
    r: 255,
    g: 255,
    b: 255,
  },
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = {
      r: 0,
      g: 0,
      b: 0,
    },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height = width = canvas.width = blockSize;

  context.drawImage(
    imgEl,
    sx,
    sy,
    blockSize,
    blockSize,
    0,
    0,
    blockSize,
    blockSize
  );

  try {
    data = context.getImageData(0, 0, blockSize, blockSize);
  } catch (e) {
    console.log(e);
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += gridSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
}

function drawCanvas(imgId, dx = 0, dy = 0) {
  let params = parseInputs();
}

function openCanvas() {
  window.open(document.getElementById("outputCanvas").toDataURL());
}

function renderPreview(outputCanvas) {
  let src = outputCanvas.toDataURL();
  $("#preview").attr("src", `${src}`);
}
