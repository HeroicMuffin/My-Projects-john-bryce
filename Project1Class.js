//--------------class constructor------------//
class noteObject {
  constructor(id, subject, textArea, date, time, completed) {
    !id
      ? (this.id = `note#${Math.random()
          .toString(36)
          .substr(2, 9)}`)
      : (this.id = id);

    this.subject = subject;
    this.textArea = textArea;
    this.date = date;
    this.time = time;
    this.completed = completed;
  }
  createStickyNote(noteObj) {
    const noteContainer = document.querySelector("#note-container");
    const newNote = document.createElement("div");
    newNote.className = "sticky-note";
    newNote.id = noteObj.id;

    const noteHeader = document.createElement("span");
    noteHeader.className = "Header";
    noteHeader.innerText = noteObj.subject;

    const noteInnerText = document.createElement("div");
    noteInnerText.className = "noteInnerContent";
    noteInnerText.innerText = noteObj.textArea;

    const datePrint = document.createElement("div");
    datePrint.className = "dateAndTimePrint";
    datePrint.innerText = modifyDate(noteObj.date) + "\n" + noteObj.time;

    const deleteButton = document.createElement("button");
    deleteButton.className = "glyphicon glyphicon-trash";
    deleteButton.id = `trashButton#${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    deleteButton.addEventListener("click", () => {
      const noteID = newNote.id;
      const note2remove = document.getElementById(noteID);
      note2remove.remove();
      updateStorage(noteID);
    });
    const comepletedButton = document.createElement("button");
    comepletedButton.className = "glyphicon glyphicon-check";
    comepletedButton.id = "completedButton";
    comepletedButton.addEventListener("click", () => {
      noteObj.completed = true;
      // document.getElementById("comepletedButton.id").style.visibility = "hidden";

      stickyNoteStorage.forEach(element => {
        if (element.id === newNote.id) {
          element.completed = true;
          document.getElementById(newNote.id).style.opacity = 0.5;
          localStorage.clear();

          let JSONarrayNew = JSON.stringify(stickyNoteStorage);
          localStorage.setItem("stickyNoteStorage", JSONarrayNew);
        }
      });
    });

    newNote.append(noteHeader);
    newNote.append(deleteButton);
    newNote.append(noteInnerText);
    newNote.append(datePrint);
    newNote.append(comepletedButton);
    noteContainer.append(newNote);

    if (noteObj.completed)
      document.getElementById(noteObj.id).style.opacity = 0.5;

    newNote.onmouseout = () => {
      document.getElementById(deleteButton.id).style.visibility = "hidden";
    };
    newNote.onmouseover = () => {
      document.getElementById(deleteButton.id).style.visibility = "visible";
    };
  }
}
