
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBlbtY4r0UWhRHVGpq_hbs4f8nP92EEpWE",
  authDomain: "databasefornews.firebaseapp.com",
  projectId: "databasefornews",
  storageBucket: "databasefornews.appspot.com",
  messagingSenderId: "706904536931",
  appId: "1:706904536931:web:4b9ac4bca868014a47c556",
  measurementId: "G-J0T28QC6T2"
};

  // Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add news
function addNews() {
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const img = document.getElementById('img').value;
  const news = document.getElementById('news').value;
  
  addDoc(collection(db, "news"), {
    title: title,
    date: date,
    img: img,
    news: news
  })
  .then(() => {
    console.log("Document successfully written!");
    document.getElementById('title').value = '';
    document.getElementById('date').value = '';
    document.getElementById('img').value = '';
    document.getElementById('news').value = '';
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
}

document.getElementById("row-container").innerHTML=""
  db.collection("news").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const newsData = doc.data();
      const cardHtml = `
          <div class="row-box">
            <div class="row-img">
                <img src="${newsData.imgUrl}" alt="img" draggable="false" height="250px" width="350">
            </div>
            <div class="row-text">
              <span>${newsData.stringDate}</span>
              <a href="#" class="row-title">${newsData.title}</a>
              <p>${newsData.text}</p>
                 <a href="#">Още...</a>
            </div>
          </div>
      `;
      document.getElementById("row-container").innerHTML += cardHtml;
    });
  });