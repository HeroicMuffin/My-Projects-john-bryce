//==============Project 1================
const notesDOM = {
  formSubjectText: document.querySelector("#formSubjectText"),
  formTextArea: document.querySelector("#formTextArea"),
  formDate: document.querySelector("#formDate"),
  formTime: document.querySelector("#formTime")
};

let stickyNoteStorage = [];

function execute() {
  if (
    formSubjectText.value.length > 15 ||
    !formTextArea.value ||
    !formDate.value ||
    !formTime.value ||
    !valiDate(formDate.value)
  ) {
    alert(
      "Title must be shorter than 15 charaters, Date must be future date and every parameter must be filled!"
    );
    return;
  } else
    draw(
      0,
      formSubjectText.value,
      formTextArea.value,
      formDate.value,
      formTime.value,
      false
    );
}

const draw = (id, subject, text, date, time, completed) => {
  const newStickyNote = new noteObject(
    id,
    subject,
    text,
    date,
    time,
    completed
  );
  stickyNoteStorage.push(newStickyNote);

  let JSONarray = JSON.stringify(stickyNoteStorage);
  localStorage.setItem("stickyNoteStorage", JSONarray);

  stickyNoteStorage[stickyNoteStorage.length - 1].createStickyNote(
    newStickyNote
  );
};

function resetForm() {
  document.querySelector(".form-horizontal").reset();
}

function updateStorage(noteID) {
  stickyNoteStorage = stickyNoteStorage.filter(
    thisNote => thisNote.id != noteID
  );

  let JSONarray = JSON.stringify(stickyNoteStorage);
  localStorage.removeItem("stickyNoteStorage", JSONarray);
  let JSONarrayNew = JSON.stringify(stickyNoteStorage);
  localStorage.setItem("stickyNoteStorage", JSONarrayNew);
}

function drawFromStorageOnBoot() {
  const localArray = JSON.parse(localStorage.getItem("stickyNoteStorage"));
  localArray &&
    localArray.forEach(note => {
      const { id, subject, textArea, date, time, completed } = note;
      draw(id, subject, textArea, date, time, completed);
    });
}

function valiDate(date) {
  return new Date(date).getTime() > new Date().getTime();
}

function modifyDate(date) {
  const incorrectDate = new Date(date);
  let day = incorrectDate.getDate();
  let month = incorrectDate.getMonth() + 1;
  const year = incorrectDate.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  return `${day}/${month}/${year}`;
}

function All() {
  for (let i = 0; i < stickyNoteStorage.length; i++) {
    document.getElementById(stickyNoteStorage[i].id).style.visibility =
      "visible";
  }
}
function Open() {
  All();
  for (let i = 0; i < stickyNoteStorage.length; i++) {
    if (stickyNoteStorage[i].completed)
      document.getElementById(stickyNoteStorage[i].id).style.visibility =
        "hidden";
  }
}
function Completed() {
  All();
  for (let i = 0; i < stickyNoteStorage.length; i++) {
    if (!stickyNoteStorage[i].completed)
      document.getElementById(stickyNoteStorage[i].id).style.visibility =
        "hidden";
  }
  document.getElementById("completedButton").style.visibility = "hidden";
}

// const render = (beforeFn, condition, display) => {
//   beforeFn();
//   for (let i = 0; i < stickyNoteStorage.length; i++) {
//     if (condition(stickyNoteStorage, i))
//       document.getElementById(
//         stickyNoteStorage[i].id
//       ).style.visibility = display;
//   }
// };
// const All = () => {
//   render(() => {}, () => true, "visible");
// };
// const Completed = () => {
//   render(() => All(), (storage, i) => !storage[i].completed, "hidden");
// };
// const Open = () => {
//   render(() => All(), (storage, i) => storage[i].completed, "hidden");
// };

drawFromStorageOnBoot(); 
