let note = {
            id: "",
            title: "",
            content: ""
        };

let listofnotes = JSON.parse(localStorage.getItem('localnotes')) || [];

function addnewnote(){
    document.getElementById("titleNote").value = "";
    document.getElementById("contentNote").value = "";
    notemodal.showModal();
};

function generateID(){
    return Date.now().toString()
} 

function savefunction(){
    const title = document.getElementById("titleNote").value.trim();
    const content = document.getElementById("contentNote").value.trim();

    note = {
        id: generateID(),
        title: title,
        content: content
    };

    listofnotes.unshift({...note});

    document.getElementById("notemodal").close();

    nonotesID.style.display = "none";

    localStorage.setItem('localnotes', JSON.stringify(listofnotes));
    console.log(listofnotes);

    displaynotes()
};

function displaynotes(){
    if (listofnotes.length === 0) {
        document.getElementById("nonotesID").style.display = "flex";
        notecontainer.innerHTML = "";
    }
    else {
        document.getElementById("nonotesID").style.display = "none";
        document.getElementById("notecontainer").innerHTML = listofnotes.map(note => 
            `
        <div onclick = "editnote('${note.id}')" class="flex flex-col w-[280px] h-[400px] bg-white my-[20px] mx-[20px] py-[10px] px-[10px] rounded-[10px] gap-[6px] hover:shadow-lg group">
    
    <div class="flex flex-row justify-between">
        <div>
            <h1 class="font-bold text-[18px] overflow-X-auto grow max-w-[200px] break-words">
                ${note.title}
            </h1>
        </div>
        
        <div class="flex flex-row justify-end items-center gap-[6px]">
            <svg onclick = "event.stopPropagation(); editnote('${note.id}')" class="lg:hidden border-none rounded bg-gray-200 p-[4px] w-[20px] h-[20px] group-hover:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#191b23"><path d="M184-184v-83.77l497.23-498.77q5.15-5.48 11.07-7.47 5.93-1.99 11.99-1.99 6.06 0 11.62 1.54 5.55 1.54 11.94 7.15l38.69 37.93q5.61 6.38 7.54 12 1.92 5.63 1.92 12.25 0 6.13-2.24 12.06-2.24 5.92-7.22 11.07L267.77-184H184Zm505.15-466.46L744-704.54 704.54-744l-54.08 54.85 38.69 38.69Z"/></svg>
            <svg onclick = "event.stopPropagation(); deletenote('${note.id}')" class="lg:hidden border-none rounded bg-gray-200 p-[4px] w-[20px] h-[20px] group-hover:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#191b23"><path d="M291-267.69 267.69-291l189-189-189-189L291-692.31l189 189 189-189L692.31-669l-189 189 189 189L669-267.69l-189-189-189 189Z"/></svg>
        </div>    
    </div> 
        <h1 class="grow overflow-y-auto max-h-[250px] break-words">
            ${note.content}
        </h1>
    </div>
            `).join("")

            document.querySelectorAll(".note-block");
    }
}

function deletenote(id){
    listofnotes = listofnotes.filter(note => note.id != id);

    localStorage.setItem('localnotes', JSON.stringify(listofnotes));

    displaynotes()
}


function editnote(id){
    const editnote = listofnotes.find(note => note.id == id);
    document.getElementById("titleNoteEdit").value = editnote.title;
    document.getElementById("contentNoteEdit").value = editnote.content;

    notemodaledit.dataset.id = id;
    notemodaledit.showModal();
}

function savenewnote(){
    const id = notemodaledit.dataset.id;
    const editnote = listofnotes.find(note => note.id == id);

    editnote.title = document.getElementById("titleNoteEdit").value.trim();
    editnote.content = document.getElementById("contentNoteEdit").value.trim();

    localStorage.setItem('localnotes', JSON.stringify(listofnotes));
    displaynotes()
    notemodaledit.close();
}
