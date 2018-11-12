/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const ul = document.querySelector('.student-list');

const ulList = ul.children;

let newList = [];

const studentSearch = document.querySelector('.student-search input');

const studentSearchBtn = document.querySelector('.student-search button');

for (let i = 0; i < ulList.length; i += 1) {
  let li = ulList[i];
  if (i >= 0 && i <= 9) {
     li.style.display = '';
   } else if (i > 9) {
     li.style.display = 'none';
   }
 }

//Create showPage function to display the correct list items on the page when a pagination link is clicked
const showPage = (list, page) => {
  for (let i = 0; i < list.length; i += 1) {
    let li = list[i];
    if (i >= (page * 10) - 10 && i <= (page * 10) - 1) {
       console.log(li);
       li.style.display = '';
     } else {
       li.style.display = 'none';
     }
   }
}

//Create appendPageLinks function to add workable links for the pages
const appendPageLinks = (list) => {
  //Determine how many pages are needed for the list by dividing the total number of the list items by the max number of items per page
  const dividedList = list.length / 10;
  //console.log(dividedList);
  const roundedList = Math.floor(dividedList);
  //Create a div, give it the "pagination" class, and append it to the .page div
  const paginationDiv = document.createElement('DIV');
  paginationDiv.className = 'pagination';                    `   `
  const pageDiv = document.querySelector('.page');
  pageDiv.append(paginationDiv);
  //Add a ul to the "pagination" div for pagination buttons
  const paginationUl = document.createElement('UL');
  paginationDiv.append(paginationUl);

  for (let i = 0; i <= roundedList; i += 1){
    //Add li and a tags with the page number text
    let li = document.createElement('LI');
    paginationUl.append(li);
    let a = document.createElement('A');
    li.append(a);
    let btnText = document.createTextNode(i + 1);
    a.appendChild(btnText);
    //Add an event listener to each a tag, when they are clicked call the showPage function to display the appropriate page
    a.addEventListener('click', (e) => {
      console.log(a);
      console.log(e.target.innerHTML);
      //Set off the showPage function displaying the correct target's list
      showPage(list, e.target.innerHTML);
    });
  }
}

appendPageLinks(ulList);

const searchStudents = () => {
  let studentName = studentSearch.value.toUpperCase();
  for (i = 0; i < ulList.length; i++) {
      let li = ulList[i];
      let listName = li.getElementsByTagName("h3")[0];
      if (listName.innerHTML.toUpperCase().indexOf(studentName) > -1) {
          li.style.display = '';
      } else {
          li.style.display = 'none';
      }
  }
}

studentSearch.addEventListener('keyup', (e) => {
  searchStudents();
  let counter = 0;
  for (i = 0; i < ulList.length; i++) {
    let li = ulList[i];
    if (li.style.display === ''){
      counter++;
      newList.push(li);
    }
  }
});

studentSearchBtn.addEventListener('click', (e) => {
  searchStudents();
});
