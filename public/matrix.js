$(document).ready(function () {
  var res = document.querySelectorAll('.mainClick');

  $(document).on('click', '.mainClick', function () {
    var opResult = $('.customOperation').val();

    var myArr = document.forms.inputField;
    var myControls = myArr;
    var name_value_array = [];
    for (var i = 0; i < myControls.length; i++) {
      var aControl = myControls[i];

      // don't print the button value
      if (aControl.type != 'button') {
        // store value in a map
        name_value_array.push(aControl.value, aControl.name);

        document.getElementById('resultField');
      }
    }
    // show map values as a popup
    var firstMatrix = document.querySelectorAll('.firstInput');

    var secondMatrix = document.querySelectorAll('.secondInput');
    var toWhatDivide = 0;
    var toWhatDivideSecond = 0;
    if (secondMatrix.length == 4) {
      toWhatDivideSecond = 2;
    } else if (secondMatrix.length == 9) {
      toWhatDivideSecond = 3;
    } else {
      toWhatDivideSecond = 4;
    }

    if (firstMatrix.length == 4) {
      toWhatDivide = 2;
    } else if (firstMatrix.length == 9) {
      toWhatDivide = 3;
    } else {
      toWhatDivide = 4;
    }
    var counter = 1;
    var resultArray = [];
    var tempResult = [];

    for (var i = 0; i < firstMatrix.length; i++) {
      tempResult.push(firstMatrix[i].value);
      if (counter % toWhatDivide == 0) {
        var secondTempResult = [...tempResult];
        resultArray.push(secondTempResult);
        tempResult.splice(0, tempResult.length);
      }

      counter++;
    }
    var counterSecond = 1;
    var resultArraySecond = [];
    var tempResultSecond = [];

    for (var i = 0; i < secondMatrix.length; i++) {
      tempResultSecond.push(secondMatrix[i].value);
      if (counterSecond % toWhatDivideSecond == 0) {
        var secondTempResultSecond = [...tempResultSecond];
        resultArraySecond.push(secondTempResultSecond);
        tempResultSecond.splice(0, tempResultSecond.length);
      }

      counterSecond++;
    }

    const jObject = {
      resultArray: resultArray,
      opName: opResult,
      resultArraySecond: resultArraySecond,
    };

    const data = JSON.stringify(jObject);

    $.ajax({
      url: '/calculate/matrix',
      type: 'POST',
      data: data,
      processData: false,
      contentType: 'application/json',
      success: function (response) {
        console.log(response);
        var resultArr = document.querySelector('.customResult');
        resultArr.innerHTML = ' ';
        for (let i = 0; i < response.result.length; i++) {
          var row = document.createElement('div');

          for (let j = 0; j < response.result[i].length; j++) {
            var column = document.createElement('span');
            column.innerHTML = `${response.result[i][j]}`;
            row.appendChild(column);
          }
          resultArr.appendChild(row);
        }
        // document.querySelector;
      },
      error: function (jqXHR, textStatus, errorMessage) {
        console.log(errorMessage); // Optional
      },
    });
  });

  //   async function calcJacobian() {
  //     console.log('Entered');
  //     [
  //       [1, 2, 3],
  //       [4, 5, 6],
  //       [7, 8, 9],
  //     ];
  //     var myArr = document.forms.inputField;
  //     var myControls = myArr;
  //     var name_value_array = [];
  //     for (var i = 0; i < myControls.length; i++) {
  //       var aControl = myControls[i];

  //       // don't print the button value
  //       if (aControl.type != 'button') {
  //         // store value in a map
  //         name_value_array.push(aControl.value, aControl.name);

  //         document
  //           .getElementById('resultField')
  //           .appendChild(document.createTextNode(aControl.value + ' '));
  //       }
  //     }
  //     // show map values as a popup
  //     var firstMatrix = document.querySelectorAll('.firstInput');

  //     var secondMatrix = document.querySelectorAll('.secondInput');
  //     var toWhatDivide = 0;
  //     var toWhatDivideSecond = 0;
  //     if (secondMatrix.length == 4) {
  //       toWhatDivideSecond = 2;
  //     } else if (secondMatrix.length == 9) {
  //       toWhatDivideSecond = 3;
  //     } else {
  //       toWhatDivideSecond = 4;
  //     }

  //     if (firstMatrix.length == 4) {
  //       toWhatDivide = 2;
  //     } else if (firstMatrix.length == 9) {
  //       toWhatDivide = 3;
  //     } else {
  //       toWhatDivide = 4;
  //     }
  //     var counter = 1;
  //     var resultArray = [];
  //     var tempResult = [];

  //     for (var i = 0; i < firstMatrix.length; i++) {
  //       tempResult.push(firstMatrix[i].value);
  //       if (counter % toWhatDivide == 0) {
  //         var secondTempResult = [...tempResult];
  //         resultArray.push(secondTempResult);
  //         await tempResult.splice(0, tempResult.length);
  //       }

  //       counter++;
  //     }
  //     var counterSecond = 1;
  //     var resultArraySecond = [];
  //     var tempResultSecond = [];

  //     for (var i = 0; i < secondMatrix.length; i++) {
  //       tempResultSecond.push(secondMatrix[i].value);
  //       if (counterSecond % toWhatDivideSecond == 0) {
  //         var secondTempResultSecond = [...tempResultSecond];
  //         resultArraySecond.push(secondTempResultSecond);
  //         await tempResultSecond.splice(0, tempResultSecond.length);
  //       }

  //       counterSecond++;
  //     }

  //     // console.log(resultArray);
  //     // console.log(resultArraySecond);

  //     const jObject = {
  //       resultArray: resultArray,
  //       resultArraySecond: resultArraySecond,
  //     };

  //     const data = JSON.stringify(jObject);

  //     $.ajax({
  //       url: '/calculate/matrix',
  //       type: 'POST',
  //       data: data,
  //       processData: false,
  //       contentType: 'application/json',
  //       success: function (response) {
  //         // window.location = `/ocr.html?expr=${response.data[1].value}`
  //       },
  //       error: function (jqXHR, textStatus, errorMessage) {
  //         console.log(errorMessage); // Optional
  //       },
  //     });
  //   }

  var select = document.querySelector('#matrixValue');
  select.addEventListener('change', function () {
    var inputField = document.querySelectorAll('#inputField');

    if (this.value == 2) {
      var count = 1;
      inputField.forEach((element) => {
        element.innerHTML = ' ';
        if (count == 1) {
          element.innerHTML = `
          <div class="input-group">
            <input type="number "   class = 'firstInput 'name="field00" size="3">
            <input type="number    " class = 'firstInput ' name="field01" size="3">
          </div>

          <div class="input-group">
            <input type="number   " class = 'firstInput ' name="field10" size="3">
            <input type="number   " class = 'firstInput ' name="field11" size="3">
          </div>

          <input type="button"  value="calculate" name="calculate" class="btn mainClick btn-info">
        `;
        } else {
          element.innerHTML = `
            <div class="input-group">
              <input type="number "  class= "secondInput "name="field00" size="3">
              <input type="number   " class = "secondInput " name="field01" size="3">
            </div>

            <div class="input-group">
              <input type="number  " class = "secondInput " name="field10" size="3">
              <input type="number  " class = "secondInput " name="field11" size="3">
            </div>

            <input type="button"  value="calculate" name="calculate" class="btn mainClick btn-info">
          `;
        }

        count++;
      });
    } else if (this.value == 3) {
      var count = 1;
      inputField.forEach((element) => {
        element.innerHTML = ' ';
        if (count == 1) {
          element.innerHTML = `
            <div class="input-group">
              <input type="number" class="firstInput" name="field00" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
            </div>

            <div class="input-group">
              <input type="number" class="firstInput" name="field10" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field11" size="3">
            </div>

            <div class="input-group">
              <input type="number" class="firstInput" name="field10" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field11" size="3">
            </div>

            <input type="button"  value="calculate" name="calculate" class="btn mainClick btn-info">

          `;
        } else {
          element.innerHTML = `

        
            <div class="input-group">
              <input type="number"  class="secondInput" name="field00" size="3">
              <input type="number" class="secondInput" name="field01" size="3">
              <input type="number" class="secondInput" name="field01" size="3">
            </div>

            <div class="input-group">
              <input type="number" class="secondInput" name="field10" size="3">
              <input type="number" class="secondInput" name="field01" size="3">
              <input type="number" class="secondInput" name="field11" size="3">
            </div>

            <div class="input-group">
              <input type="number" class="secondInput" name="field10" size="3">
              <input type="number" class="secondInput" name="field01" size="3">
              <input type="number" class="secondInput  name="field11" size="3">
            </div>
            <input type="button"  value="calculate" name="calculate" class="btn mainClick btn-info">
          `;
        }

        count++;
      });
    } else if (this.value == 4) {
      var count = 1;
      inputField.forEach((element) => {
        element.innerHTML = ' ';
        if (count == 1) {
          element.innerHTML = `
            <div class="input-group">
              <input type="number"  class="firstInput" name="field00" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
            </div>

            <div class="input-group">
              <input type="number" class="firstInput" name="field10" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field11" size="3">
            </div>
            <div class="input-group">
              <input type="number" class="firstInput" name="field10" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field11" size="3">
            </div>
            <div class="input-group">
              <input type="number" class="firstInput" name="field10" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field01" size="3">
              <input type="number" class="firstInput" name="field11" size="3">
            </div>
            <input type="button"  value="calculate" name="calculate" class="btn mainClick btn-info">

          `;
        } else {
          element.innerHTML = `

            <div class="input-group">
              <input type="number" class="secondInput" name="field00" size="3">
              <input type="number" class="secondInput" name="field01" size="3">
              <input type="number" class="secondInput" name="field01" size="3">
              <input type="number" class="secondInput" name="field01" size="3">
            </div>

            <div class="input-group">
              <input type="number"class="secondInput"  name="field10" size="3">
              <input type="number" class="secondInput"  name="field01" size="3">
              <input type="number" class="secondInput"  name="field01" size="3">
              <input type="number" class="secondInput"  name="field11" size="3">
            </div>

            <div class="input-group">
              <input type="number" class="secondInput"  name="field10" size="3">
              <input type="number" class="secondInput"  name="field01" size="3">
              <input type="number" class="secondInput"  name="field01" size="3">
              <input type="number" class="secondInput"  name="field11" size="3">
            </div>

            <div class="input-group">
              <input type="number" class="secondInput"  name="field10" size="3">
              <input type="number" class="secondInput"  name="field01" size="3">
              <input type="number" class="secondInput"  name="field01" size="3">
              <input type="number" class="secondInput"  name="field11" size="3">
            </div>

            <input type="button"  value="calculate" name="calculate" class="btn mainClick btn-info">
          `;
        }

        count++;
      });
    }
  });
});
