/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Hi: My file is setup for an Exceeds Expecations Grade (hopefully)

//Get the list of students
const ul = document.querySelector('.student-list');

const ulList = ul.children;

//Dynamically create a search box
const studentSearchDiv = document.createElement('DIV');
studentSearchDiv.className = 'student-search';

const pageHeader = document.getElementsByClassName('page-header');

const phh2 = pageHeader[0].children[0];
pageHeader[0].appendChild(studentSearchDiv);

const studentSearch = document.createElement('INPUT');
studentSearch.placeholder = 'Search for students...';
studentSearch.setAttribute('type', 'text');
studentSearchDiv.appendChild(studentSearch);

const studentSearchBtn = document.createElement('BUTTON');
studentSearchBtn.textContent = 'Search';
studentSearchDiv.appendChild(studentSearchBtn);

//Create a variable to display the "No results" message
const msg = document.createElement('DIV');

//Get the first 10 students to display on the first page (with no interaction from the user)
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
       //console.log(li);
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
  const roundedList = Math.floor(dividedList);
  const paginationDiv = document.createElement('DIV');

  //Create the pagination Div and UL to eventually hold the buttons
  const pageDiv = document.querySelector('.page');
  paginationDiv.className = 'pagination';
  pageDiv.append(paginationDiv);

  const paginationUl = document.createElement('UL');
  paginationDiv.append(paginationUl);

  for (let i = 0; i <= roundedList; i += 1){
    //Create the pagination buttons by adding li and a tags with the page number text
    let li = document.createElement('LI');
    paginationUl.append(li);
    let a = document.createElement('A');
    li.append(a);
    let btnText = document.createTextNode(i + 1);
    a.appendChild(btnText);

    //Add an event listener to each a tag, when they are clicked call the showPage function to display the appropriate page
    a.addEventListener('click', (e) => {
      //Remove active class of the other pagination links
      if (document.querySelector('a.active') !== null) {
        document.querySelector('a.active').classList.remove('active');
      }
      //Set off the showPage function displaying the correct target's list
      showPage(list, e.target.innerHTML);
      e.target.className = 'active';
    });
  }
}

appendPageLinks(ulList);

const searchStudents = () => {
  //Create an array for a filtered list
  let newList = [];
  let studentName = studentSearch.value.toUpperCase();
  for (i = 0; i < ulList.length; i++) {
      let li = ulList[i];
      let listName = li.getElementsByTagName("h3")[0];
      //Search for matched letters in the student names
      if (listName.innerHTML.toUpperCase().indexOf(studentName) > -1) {
          newList.push(li);
      } else {
          li.style.display = 'none';
      }
      //Display message when zero results can be found
      if (i === ulList.length - 1 && newList.length === 0 ){
        studentSearchDiv.append(msg);
        msg.innerHTML = 'No search results found';
        console.log('hey we got nothin');
      } else {
        //Empty out the message when results are found
        msg.innerHTML = '';
      }
  }
  //Drop in the first page of the new results
  for (let i = 0; i < newList.length; i += 1) {
    let li = newList[i];
    if (i >= 0 && i <= 9) {
       li.style.display = '';
     } else if (i > 9) {
       li.style.display = 'none';
     }
   }
   //Run this function again on the newly created search list
  appendPageLinks(newList);
}

//Listen for key up event and run the appropriate code to display the right messaging and results
studentSearch.addEventListener('keyup', (e) => {
  if(studentSearch.value === null) {
    //Run this function with the original list again to revert back
    appendPageLinks(ulList);
  } else {
    //Remove the initial pagination so you don't get duplicate pagination on the page
    const secondUl = document.getElementsByTagName('UL')[1];
    secondUl.remove();

    searchStudents();
  }
});

//Listen for a click event and run the appropriate code to display the right messaging and results
studentSearchBtn.addEventListener('click', (e) => {
  if(studentSearch.value === null) {
    //Run this function with the original list again to revert back
    appendPageLinks(ulList);
  } else {
    //Remove the initial pagination so you don't get duplicate pagination on the page
    const secondUl = document.getElementsByTagName('UL')[1];
    secondUl.remove();

    searchStudents();
  }
});
