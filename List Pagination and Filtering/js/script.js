/*** 
 * Global variables
***/

const students = document.getElementsByClassName('student-item');
const pageItems = 10;



/*** 
 * showPage() function displays 10 students to each page at a time.
***/

function showPage(list, page) {
   const startIndex = (page * pageItems) - pageItems;
   const endIndex = page * pageItems;

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      }else {
         list[i].style.display = 'none';
      }
   }
}

/*** 
 * appendPageLinks() function creates clickable list to navigate
 * through different pages.
***/

const noResults = document.createElement('h1');
   noResults.className = 'noResults';
   noResults.style.display = 'none';
   noResults.innerText = 'No Results';
   document.querySelector('.page').appendChild(noResults);

function appendPageLinks(list) {
   const numPages = Math.floor(list.length/pageItems);

   // Removes existing <div>, so extra page links aren't created
   const existingDiv = document.querySelector('.pagination');
   if (existingDiv){
      existingDiv.parentNode.removeChild(existingDiv);
   }
   
   // Creates <ul> within <div> and appends to page
   const newDiv = document.createElement('div');
   newDiv.className = 'pagination';
   document.querySelector('.page').appendChild(newDiv);

   const newUl = document.createElement('ul');
   newUl.className = 'pageButtons';
   document.querySelector('.pagination').appendChild(newUl);

   // Displays 'No Results' if no students are loaded
   if(list.length === 0){
      noResults.style.display = 'block';
   } else {
      noResults.style.display = 'none';
   }

   // Creates <a> within <li> inserted into the <ul>
   // Number of <a> created is based on number of students in list
   for(let i = 0; i <= numPages; i++){
      let newLi = document.createElement('li');
      let newA = document.createElement('a');

      newA.href = '#';
      newA.innerText = i + 1;
      newLi.appendChild(newA);
      document.querySelector('.pageButtons').appendChild(newLi);

      showPage(list, 1);
      newUl.firstElementChild.firstElementChild.className = 'active';
      
      // Navigate through the different pages
      newA.addEventListener('click', (e) => {
         let active = document.querySelector('.active');
         if(active !== null){
            active.classList.remove('active');
         }
         e.target.className = 'active';
         showPage(students, newA.textContent)
      })
   }
}

/***
 * searchBar() is used to search for a specific person, or group of people. 
 ***/

function searchBar() {
   // Creates <input> and <button> within a <div> and appends to page
   const newDiv = document.createElement('div');
   newDiv.className = 'student-search';
   document.querySelector('.page-header').appendChild(newDiv);
   
   const newInput = document.createElement('input');
   newInput.placeholder = 'Search for students...';
   document.querySelector('.student-search').appendChild(newInput);
   
   const newButton = document.createElement('button')
   newButton.innerText = 'Search';
   document.querySelector('.student-search').appendChild(newButton);

   // Selects students based on user input and hides unselected students
   // Updates as user types.

   function studentFilter(input) {
      let filter = input.value.toUpperCase();
      let newList = document.querySelectorAll('.student-item');

      for(i = 0; i < newList.length; i++){
         let li = newList[i];
         let name = newList[i].getElementsByTagName('h3')[0];
         let value = name.textContent;

         if(value.toUpperCase().indexOf(filter) > -1){
            li.style.display = '';
            li.className = 'student-item cf selected';
         } else{
            li.style.display = 'none';
            li.className = 'student-item cf';
         }
      }
      const arr = document.getElementsByClassName('selected');
      appendPageLinks(arr);
   }

   document.querySelector('input').addEventListener('keyup', (e) => {
      let input = e.target;
      studentFilter(input);
   })
   
   // Selects students based on user input and hides unselected students
   // Updates when user clicks 'submit' (Used if name is pasted in search bar)
   document.querySelector('button').addEventListener('click', (e) => {
      let input = document.querySelector('input');
      studentFilter(input);
   })
}

/***
 *  Call functions
***/

showPage(students, 1);
appendPageLinks(students);
searchBar();