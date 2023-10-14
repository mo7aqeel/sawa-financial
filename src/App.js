import './App.css';
import { myDb, auth } from './firebase';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Login from './Components/LoginPage';
import { child, get, ref } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';

function App() {


  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', handleTabClosing)
    return () => {
        window.removeEventListener('beforeunload', alertUser)
        window.removeEventListener('unload', handleTabClosing)
    }
    })

    const handleTabClosing = () => {
        signOut(getAuth());
    }

    const alertUser = (event) => {
        event.preventDefault()
        event.returnValue = ''
    }


  let mainList = [];


  get(child(ref(myDb), `system/2023/deps/`)).then(snapshot => {
    snapshot.forEach(snap => { snap.forEach(x => { 
      let li = [];
      x.forEach(y => {
        if (y.hasChildren()){
          li.push({
            name: y.child('name').val(),
            id1: y.child('id1').val(),
            id2: y.child('id2').val(),
            id3: y.child('id3').val(),
            id4: y.child('id4').val(),
            idCard: y.child('idCard').val(),
            checkFirst: y.child('checkFirst').val(),
            checkSecond: y.child('checkSecond').val(),
            checkThird: y.child('checkThird').val(),
            checkFourth: y.child('checkFourth').val(),
            card: y.child('card').val(),
            dateCard: y.child("dateCard").val(),
            dateFirst: y.child('dateFirst').val(),
            dateSecond: y.child('dateSecond').val(),
            dateThird: y.child('dateThird').val(),
            dateFourth: y.child('dateFourth').val(),
            dis: y.child('discount').val(),
            entry1: y.child("entry1").val(),
            entry2: y.child("entry2").val(),
            entry3: y.child("entry3").val(),
            entry4: y.child("entry4").val(),
            required: y.child("required").val(),
            entryCard: y.child('entryCard').val()
          })
        }
      })
      let obj = {
        dep: snap.key,
        stage: x.key,
        list: li
      }
      mainList.push(obj);
    })
    })
  })


  return (
      <div className="App">
        <nav className="navbar" style={{borderBottom: "3px solid #0A6EBD"}}>
          <div class="container-sm text-center">
              <h5 style={{fontWeight:'900'}}>جامعة ساوة الأهلية - شعبة الشؤون المالية</h5>
              <img src="sawa.png" alt="Logo" width="60" height="60" class="d-inline-block align-text-top"/>
          </div>
        </nav>
        <Login list={mainList}/>
      
      </div>
  );
}

export default App;
