let table = document.getElementById('targetSetting');
function appendSettingRow(host, user, repository, index, insertPos) {
  let row = table.insertRow(insertPos);
  let hostCell = row.insertCell(-1);
  let userCell = row.insertCell(-1);
  let repositoryCell = row.insertCell(-1);
  let deleteCell = row.insertCell(-1);

  let rowId = 'targetItem' + index;
  let deleteButtonId = 'deleteButton' + index;

  row.id = rowId;
  hostCell.innerHTML = '<input type="text" name="name" size="30" maxlength="100" value="' + host + '">';
  userCell.innerHTML = '<input type="text" name="name" size="30" maxlength="100" value="' + user + '">';
  repositoryCell.innerHTML = '<input type="text" name="name" size="30" maxlength="100" value="' + repository + '">';
  deleteCell.innerHTML = '<button id="' + deleteButtonId + '">delete</button>';

  let deleteButton = document.getElementById(deleteButtonId);
  deleteButton.addEventListener('click', function() {
    table.deleteRow(row.rowIndex);
  });
}

function appendFinalRow() {
  let row = table.insertRow(-1);
  let cell = row.insertCell(-1);
  cell.colSpan = 4;

  let addButtonId = "addRow";
  cell.innerHTML = '<button id="' + addButtonId + '">add</button>';
  let addButton = document.getElementById(addButtonId);
  addButton.addEventListener('click', function() {
    let rows = table.rows;
    let lastRow = rows[rows.length - 2];
    let nextRowIndex = Number(lastRow.id.slice(-1)) + 1;
    appendSettingRow('', '', '', nextRowIndex, rows.length - 1);
  });
}

let saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', function() {
  let settingRows = Array.from(table.rows).slice(1, -1);
  let settings = settingRows.map(function(setting) {
    let cells = setting.cells;
    return {
      host: cells[0].children[0].value,
      user: cells[1].children[0].value,
      repository: cells[2].children[0].value
    };
  });

  // 不正な値が入っていないかチェック
  let regex = new RegExp(/^[a-zA-Z\.\-_]+$/);
  let invalidSettings = settings.filter(function(setting) {
    return !(regex.test(setting.host) && regex.test(setting.user) && regex.test(setting.repository));
  });
  if (invalidSettings.length !== 0){
    console.log(invalidSettings);
    alert('Settings includes invalid parameter.');
  } else {
    console.log(settings);
    chrome.storage.sync.set({checkTargets: settings});
    alert('Saved.');
  }
});

chrome.storage.sync.get(['checkTargets'], function(result) {
  result.checkTargets.forEach(function(target, index) {
    appendSettingRow(target.host, target.user, target.repository, index, -1);
  });
});
appendFinalRow();