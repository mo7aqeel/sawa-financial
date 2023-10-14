import {React, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Select from 'react-select';
import { child, get, ref, set } from 'firebase/database';
import { myDb } from '../firebase';
import Setting from './Setting';
import CheckPDF from './CheckPDF';
import { tafqeet } from './Tafqeet';



export let infoList = [];

const Main = (props) => {

  const [checkNum, setCheckNum] = useState(0);

  get(child(ref(myDb), 'system/2023/checkNum')).then(snapshot => {
    setCheckNum(snapshot.val());
  })

  //Main
  let li = [...props.list];
  const [dep, setDep] = useState("");
  const [stage, setStage] = useState("")
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoObj, setInfoObj] = useState({});
  const [typeCheck, setTypeCheck] = useState("");
  const [isInfo, setIsInfo] = useState(false);

  const [entireIsnatallment, setEntireInstallment] = useState("");

  const [isSetting, setIsSetting] = useState(false);

  const [idCheck, setIdCheck] = useState("");
  const [mainValueCheck, setMainValueCheck] = useState("");
  const [dateCheck, setDateCheck] = useState("");
  const [entryCheck, setEntryCheck] = useState("");
  const [studentName, setStudentName] = useState("");
  const [isCheckPdf, setIsCheckPdf] = useState("");
  const [search, setSearch] = useState("")
  const [filteredList, setFilteredList] = useState([]);



  const [isCheckup, setIsCheckup] = useState(false);

  const deps = [
    {value: 0, label: "تقنيات البصريات - صباحي"},
    {value: 1, label: "تقنيات البصريات - مسائي"},
    {value: 2, label: "تقنيات المختبرات الطبية - صباحي"},
    {value: 3, label: "تقنيات المختبرات الطبية - مسائي"},
    {value: 4, label: "الادارة الصحية - صباحي"},
    {value: 5, label: "الادارة الصحية - مسائي"},
    {value: 6, label: "تقنيات التخدير - صباحي"},
    {value: 7, label: "تقنيات الاشعة - صباحي"},
    {value: 8, label: "القانون - صباحي"},
    {value: 9, label: "القانون - مسائي"},
    {value: 10, label: "اللغة العربية - صباحي"},
    {value: 11, label: "اللغة الانكليزية - صباحي"},
    {value: 12, label: "اللغة الانكليزية - مسائي"},
    {value: 13,label: "علوم القرآن - صباحي"},
    {value: 14,label: "هنسة تقنيات الفيزياء الطبية والعلاج الاشعاعي - صباحي"},
    {value: 15,label: "هندسة تقنيات الاجهزة الطبية - صباحي"},
    {value: 16,label: "هندسة تقنيات التبريد والتكييف - صباحي"},

  ]

  const stages = [
    {value: 1, label: "الأولى"},
    {value: 2, label: "الثانية"},
    {value: 3, label: "الثالثة"},
    {value: 4, label: "الرابعة"},
  ]


  const searchHandler = () => {
    if (stage === "" || dep === ""){
      setErrorMessage("يجب اختيار الحقول المطلوبة");
      setIsError(true);
      return
    }

    setIsError(false);
    setIsLoading(true)

    let stg = stage === "الأولى"? "first": stage === "الثانية"? "second": stage === "الثالثة"? "third": "fourth"
    get(child(ref(myDb), `system/2023/deps/${dep}/${stg}/mainCheck`)).then(snapshot => {
      li.forEach(snap => {
        if (dep === snap.dep && stg === snap.stage){
          setList(snap.list);
          setFilteredList(snap.list)
          setIsError(false)
          setEntireInstallment(snapshot.val());
        }
      })
      setIsLoading(false)
    })
    
  }


  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    setSearch(query)
    // Create copy of item list
    let updatedList = [...list];

    if (query ==""){
     updatedList =list; 
    }
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.name.includes(query.toLowerCase());
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  }




  //Checup
    const [check, setCheck] = useState("");
    const [valueCheck, setValueCheck] = useState("");
    const [installment, setInstallment] = useState(0);
    const [isAdd, setIsAdd] = useState(false);
    const [discount, setDown] = useState("-");
    const [isCardPay, setIsCardPay] = useState(false);
    const [checkNumber, setCheckNumber] = useState("");
    const [isDiscount, setIsDiscount] = useState(false);
    const [checksFilter, setChecksFilter] = useState([]);


    const checks = [
      {value: "checkFirst", label: "القسط الأول"},
      {value: "checkSecond", label: "القسط الثاني"},
      {value: "checkThird", label: "القسط الثالث"},
      {value: "checkFourth", label: "القسط الرابع"},
      {value: "card", label: "الهوية والمباشرة"}
  ]




  if (isSetting){
    return(
      <div><Setting backClick={() => {
        setIsSetting(false)
        setIsError(false)
      }}/></div>
    )
  }

  if (!isCheckup && !isCheckPdf){
    return (
      <div>
        {isError?
                <div class="alert alert-danger" role="alert">
                    {errorMessage}
                </div>: false}
        <div className='p-3 text-end'>
          <div className='w-100 p-3 text-end' style={{display:'flex', textAlign:'center'}}>
            <div style={{marginLeft:"32px"}} className='w-25'>
              <Select
              className="basic-single"
              classNamePrefix="select"
              isRtl={true}
              options={deps}
              value={deps.filter(obj => dep.includes(obj.label))}
              onChange={e => setDep(e.label)}
              isSearchable={true}
              placeholder="اختر القسم"
              name="color"
              />
            </div>
            <div className='w-25'>
              <Select
              className="basic-single"
              classNamePrefix="select"
              isRtl={true}
              options={stages}
              value={stages.filter(obj => stage.includes(obj.label))}
              onChange={e => setStage(e.label)}
              isSearchable={true}
              placeholder="اختر المرحلة"
              name="color"
              />
            </div>
            <button type="button" className="btn btn-primary w-25" style={{marginRight:'32px'}} onClick={searchHandler}>بحث</button>
            {props.entry === "محمد عقيل داود" || "نور نعيم محمد"? <button type="button" className="btn btn-danger w-25" style={{marginRight:'32px'}} onClick={() => setIsSetting(true)}>الاعدادات</button> : false}
          </div>

          {isLoading?<center><div class="spinner align-middle" style={{position:'fixed', marginRight:'49%', marginTop:'15%'}}></div></center>: false}

          <div className='p-3'>
            <div class="group w-25 text-end">
              <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <input placeholder="بحث" type="search" class="inputmain" onChange={filterBySearch}/>
            </div>
          </div>

          <table class="table table-striped text-center w-100" style={{marginTop:'32px'}}>
            <thead>
              <tr>
                <th scope="col">التسلسل</th>
                <th scope="col">اسم الطالب</th>
                <th scope="col">القسط الأول</th>
                <th scope="col">القسط الثاني</th>
                <th scope="col">القسط الثالث</th>
                <th scope="col">القسط الرابع</th>
                <th scope="col">الهوية والمباشرة</th>
                <th scope="col">المبلغ المطلوب</th>
                <th scope="col">المبلغ المستلم</th>
                <th scope="col">المبلغ المتبقي</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            {
                  filteredList.map((val, index) => {
                    let sum = (val.checkFirst==="لم يتم التسديد"?0:parseInt(val.checkFirst)) + (val.checkSecond==="لم يتم التسديد"?0:parseInt(val.checkSecond)) + (val.checkThird==="لم يتم التسديد"?0:parseInt(val.checkThird)) + (val.checkFourth==="لم يتم التسديد"?0:parseInt(val.checkFourth));
                    let obj = {
                      name: val.name,
                      id1: val.id1,
                      id2: val.id2,
                      id3: val.id3,
                      id4: val.id4,
                      idCard: val.idCard,
                      dep: dep,
                      stage: stage,
                      stageFire: stage === "الأولى"? "first": stage === "الثانية"? "second": stage === "الثالثة"? "third": "fourth",
                      checkFirst: val.checkFirst,
                      checkSecond: val.checkSecond,
                      checkThird: val.checkThird,
                      checkFourth: val.checkFourth,
                      card: val.card,
                      dateFirst: val.dateFirst,
                      dateSecond: val.dateSecond,
                      dateThird: val.dateThird,
                      dateFourth: val.dateFourth,
                      entry1: val.entry1,
                      entry2: val.entry2,
                      entry3: val.entry3,
                      entry4: val.entry4,
                      entryCard: val.entryCard,
                      dis: val.dis,
                      sum: sum,
                      required: val.required,
                      key: index
                    }      
                    return(
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{val.name}</td>
                        <td><button className={`btn ${val.checkFirst==="لم يتم التسديد"? "btn-secondary": "btn-success"}`} onClick={() => {
                          setTypeCheck("القسط الأول");
                          setIdCheck(val.id1);
                          setMainValueCheck(val.checkFirst);
                          setDateCheck(val.dateFirst);
                          setEntryCheck(val.entry1);
                          setStudentName(val.name);
                          setIsInfo(true)
                        }} disabled={val.checkFirst==="لم يتم التسديد"?true: false}>{val.checkFirst === "لم يتم التسديد"? "لم يتم التسديد": "تم التسديد" }</button></td>
                        <td><button className={`btn ${val.checkSecond==="لم يتم التسديد"? "btn-secondary": "btn-success"}`} onClick={() => {
                          setTypeCheck("القسط الثاني");
                          setIdCheck(val.id2);
                          setMainValueCheck(val.checkSecond);
                          setDateCheck(val.dateSecond);
                          setEntryCheck(val.entry2);
                          setStudentName(val.name)
                          setIsInfo(true)
                        }} disabled={val.checkSecond==="لم يتم التسديد"?true: false}>{val.checkSecond === "لم يتم التسديد"? "لم يتم التسديد": "تم التسديد"}</button></td>
                        <td><button className={`btn ${val.checkThird==="لم يتم التسديد"? "btn-secondary": "btn-success"}`} onClick={() =>{
                           setTypeCheck("القسط الثالث");
                           setIdCheck(val.id3);
                           setMainValueCheck(val.checkThird);
                           setDateCheck(val.dateThird);
                           setEntryCheck(val.entry3);
                           setStudentName(val.name)
                           setIsInfo(true)
                        }} disabled={val.checkThird==="لم يتم التسديد"?true: false}>{val.checkThird === "لم يتم التسديد"? "لم يتم التسديد": "تم التسديد"}</button></td>
                        <td><button className={`btn ${val.checkFourth==="لم يتم التسديد"? "btn-secondary": "btn-success"}`} onClick={() => {
                           setTypeCheck("القسط الرابع");
                           setIdCheck(val.id4);
                           setMainValueCheck(val.checkFourth);
                           setDateCheck(val.dateFourth);
                           setEntryCheck(val.entry4);
                           setStudentName(val.name)
                           setIsInfo(true)
                        }} disabled={val.checkFourth==="لم يتم التسديد"?true: false}>{val.checkFourth === "لم يتم التسديد"? "لم يتم التسديد": "تم التسديد"}</button></td>
                        <td><button className={`btn ${val.card==="لم يتم التسديد"? "btn-secondary": "btn-success"}`} onClick={() => {
                          setTypeCheck("الهوية والمباشرة");
                          setIdCheck(val.idCard);
                          setMainValueCheck(val.card);
                          setDateCheck(val.dateCard);
                          setEntryCheck(val.entryCard);
                          setStudentName(val.name)
                          setIsInfo(true);
                        }} disabled={val.card==="لم يتم التسديد"?true: false}>{val.card === "لم يتم التسديد"? "لم يتم التسديد": "تم التسديد"}</button></td>
                        <td>{new Intl.NumberFormat('en-US').format(val.required)}</td>
                        <td>{new Intl.NumberFormat('en-US').format(sum)}</td>
                        <td>{new Intl.NumberFormat('en-US').format(val.required - sum)}</td>
                        <td>   
                          <button className='btn btn-primary' onClick={() => 
                            {
                              setInfoObj(obj);
                              setIsCheckup(true);
                              let li = [];
                              obj.dis !== "-"? setIsDiscount(true) : setIsDiscount(false);
                              console.log(val.checkFourth)
                              if (val.checkFirst === "لم يتم التسديد"){
                                li.push(checks[0])
                                setChecksFilter(li);
                              }
                              if (val.checkSecond === "لم يتم التسديد"){
                                li.push(checks[1])
                                setChecksFilter(li);
                              }
                              if (val.checkThird === "لم يتم التسديد"){
                                li.push(checks[2])
                                setChecksFilter(li);
                              }
                              if (val.checkFourth==="لم يتم التسديد"){
                                li.push(checks[3])
                                setChecksFilter(li);
                              }
                              if (val.card === "لم يتم التسديد"){
                                li.push(checks[4])
                                setChecksFilter(li);
                              }

                            }}>اضافة قسط</button>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>

          {isInfo?
          <div className="cookie-card text-center" style={{right:'35%', top:'30%'}}>
            <span className="title">{studentName} - {typeCheck}</span>
            <p className='description' style={{lineHeight:'1.9'}}>
              رقم الوصل : <span style={{fontWeight:'700'}}>{idCheck}</span> <br/>
              قيمة القسط : <span style={{fontWeight:'700'}}>{new Intl.NumberFormat('en-US').format(mainValueCheck)} دينار </span><br/>
              تاريخ الوصل : <span style={{fontWeight:'700'}}>{dateCheck}</span> <br/>
              الموظف : <span style={{fontWeight:'700'}}>{entryCheck}</span>
            </p>
            <div className="actions">
                <button className="btn btn-dark" onClick={() => setIsInfo(false)}>
                    موافق
                </button>
                <button className="btn-primary btn" onClick={() => setIsCheckPdf(true)}>
                    طباعة
                </button>
            </div>
          </div>: false}
        </div>
      </div>
    );
  } else if (isCheckPdf) {
    return(
      <div>
        <CheckPDF
        name={studentName}
        dep={dep}
        stage={stage}
        valNum={mainValueCheck}
        check={typeCheck}
        date={dateCheck}
        id={idCheck}
        backClick = {() => {
          setIsCheckPdf(false)
          setIsCheckup(false)
          setIsInfo(false);
          setIsAdd(false);
      }}

        />
      </div>
    )
  }
  
  
  else {

    const addCardPay = () => {
      if (installment === "" || check === ""){
        setErrorMessage("يجب ادخال الحقول المطلوبة");
        setIsError(true);
        return
      }
      if (infoObj.dis !== "-"){
        setDown(infoObj.dis);
        setIsDiscount(true);
      }
      setIsCardPay(true)
      setIsError(false)
      console.log(infoObj.dis);
    }


    function addCheckHandler(mycheck, value, dis){

      setIsLoading(true);

      console.log(dis);


      let checkNum = 0

      get(child(ref(myDb), "system/2023/checkNum")).then(snapshot => {
        console.log(snapshot.val())
        checkNum = parseInt(snapshot.val()) + 1;
        setCheckNumber(checkNum)
      
        setIsCardPay(false);
        let date = `${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`;
        let dateCount = valueCheck === "checkFirst"? "dateFirst": valueCheck === "checkSecond"? "dateSecond": valueCheck === "checkThird"? "dateThird": valueCheck === "checkFourth"? "dateFourth": "dateCard";
        let entryCount = valueCheck === "checkFirst"? "entry1": valueCheck === "checkSecond"? "entry2": valueCheck === "checkThird"? "entry3": valueCheck === "checkFourth"? "entry4": "entryCard";
        let idCount = valueCheck === "checkFirst"? "id1": valueCheck === "checkSecond"? "id2": valueCheck === "checkThird"? "id3": valueCheck === "checkFourth"? "id4": "idCard";

        let checkRequire = entireIsnatallment;
        if(dis !== "-"){
          let disPercent = entireIsnatallment * (dis/100);
          checkRequire = entireIsnatallment - disPercent;
        }

          if(set(child(ref(myDb), `system/2023/deps/${infoObj.dep}/${infoObj.stageFire}/${infoObj.key+1}/required`), checkRequire)
          &&set(child(ref(myDb), `system/2023/deps/${infoObj.dep}/${infoObj.stageFire}/${infoObj.key+1}/${mycheck}`), value)
          && set(child(ref(myDb), `system/2023/deps/${infoObj.dep}/${infoObj.stageFire}/${infoObj.key+1}/discount`), dis === ""? "-" : dis)
          && set(child(ref(myDb), `system/2023/deps/${infoObj.dep}/${infoObj.stageFire}/${infoObj.key+1}/${idCount}`), checkNum)
          && set(child(ref(myDb), `system/2023/checkNum`), checkNum)
          && set(child(ref(myDb), `system/2023/deps/${infoObj.dep}/${infoObj.stageFire}/${infoObj.key+1}/${entryCount}`), props.entry)
          && set(child(ref(myDb), `system/2023/deps/${infoObj.dep}/${infoObj.stageFire}/${infoObj.key+1}/${dateCount}`), date)){
              console.log("Succeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees");
              setIsAdd(true);
              setIsLoading(false);
              setCheck("");
              setInstallment("");
              setDown(dis);
              setIsDiscount(true);
              infoObj[mycheck] = value;
              infoObj[dateCount] = date;
              infoObj['dis'] = dis;
              infoObj[idCount] = checkNum;
              infoObj[entryCount] = props.entry;
              infoObj['required'] = checkRequire;
              list[infoObj['key']] = infoObj;
           
      }})
    }


    return(
        <div>

          {isCardPay?
          <div class="cardPay">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"/></svg>
            <p class="cookieHeading">تأكيد الدفع</p>
            <p class="cookieDescription">هل متأكد من تسديد القسط الحالي</p>

            <p style={{textAlign:'center', lineHeight:'32px'}}>{check}
              <br/>{new Intl.NumberFormat('en-US').format(installment)} دينار<br/>
            {tafqeet(installment)} دينار</p>

            <div class="buttonContainer">
              <button class="declineButton" onClick={() => setIsCardPay(false)}>إلغاء</button>
              <button class="acceptButton" onClick={() => addCheckHandler(valueCheck, installment, discount)}>موافق</button>
            </div>
          </div> : false}

          {isError?
                <div class="alert alert-danger" role="alert">
                    {errorMessage}
                </div>: false}
            <div style={{width:'100%', direction:'ltr'}}>
                <button class="learn-more text-center" onClick={() => {
                  setIsCheckup(false)
                  setIsError(false);
                  setInstallment("");
                  setCheck("");
                }}>
                    <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">رجوع</span>
                </button>
            </div>

            <br/>
            <br/>

          {isAdd?<span style={{background:'#000', width:'100%', height:'100%', position:'fixed', opacity:'.2', transition:'all .3s'}}></span>: false}
            <div className='p-5 text-sm-center'>

                <div className='text-sm-center' style={{display:'flex', width:'100%', justifyContent:'center'}}>
                    <h5 style={{marginLeft:'5%'}}>اسم الطالب : <strong>{infoObj.name}</strong></h5>
                    <h5 style={{marginLeft:'5%'}}>القسم : <strong>{infoObj.dep}</strong></h5>
                    <h5>المرحلة : <strong>{infoObj.stage}</strong></h5>
                </div>

                {isLoading?<center><div class="spinner align-middle" style={{position:'fixed', marginRight:'49%', marginTop:'15%'}}></div></center>: false}

                {isAdd?
                <div class="card" style={{position:'fixed'}}> 
                    <div class="header"> 
                        <div class="image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path> </g></svg>
                        </div> 
                        <div class="content">
                            <h5 class="title">تم اضافة القسط بنجاح</h5> 
                            <h6 class="message">رقم الوصل : {checkNumber}</h6> 
                            <h6 class="message">تاريخ الوصل : 3/10/2023</h6> 
                        </div> 
                        <div class="actions">
                            <button type="button" class="btn btn-outline-success w-100" style={{marginTop: '0.3rem'}} onClick={() => {
                              setIsAdd(false)
                              setIsCheckup(false)
                              setIsDiscount(false);
                              setInstallment("");
                              setCheck("");
                              setDown("");
                              }}>موافق</button> 
                        </div> 
                    </div> 
                </div>
                :false}




                <table class="table table-striped-columns text-sm-center w-100" style={{marginTop:'64px'}}>
                    <thead>
                        <tr>
                            <th scope="col">قسط القسم</th>
                            <th scope="col">نسبة التخفيض للطالب</th>
                            <th scope='col'>المبلغ الكلي المطلوب</th>
                            <th scope="col" style={{fontWeight:'900'}}>المبلغ المستلم</th>
                            <th scope='col'> المبلغ المتبقي</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                           <td>{new Intl.NumberFormat('en-US').format(entireIsnatallment)}</td>
                            <td>%{infoObj.dis}</td>
                            <td>{new Intl.NumberFormat('en-US').format(infoObj.required)}</td>
                            <td style={{fontWeight:'900'}}>{new Intl.NumberFormat('en-US').format(infoObj.sum)}</td>
                            <td scope='col'>{new Intl.NumberFormat('en-US').format(infoObj.required - infoObj.sum)}</td>
                        </tr>
                    </tbody>
                </table>

                <br/>
                <br/>
                
                <div style={{display:'flex', marginTop:'32px',justifyContent:'center'}} className='w-100'>
                    <div className='w-25'>
                      <Select
                          className="basic-single"
                          classNamePrefix="select"
                          isRtl={true}
                          options={checksFilter}
                          value={checksFilter.filter(obj => check.includes(obj.label))}
                          onChange={e => {setCheck(e.label) 
                              setValueCheck(e.value)}}
                          placeholder="اختر القسط"
                          isDisabled={isAdd || isCardPay}
                          isSearchable={false}
                          name="checks"
                      />
                    </div>
                    <div className='w-25' style={{display:'flex', marginRight:'5%'}}>
                        <p for="input" style={{fontWeight:'900'}}>قيمة القسط</p>
                        <input type='number' disabled={isAdd || isCardPay} onChange={e => setInstallment(e.target.value)} class="input form-control" placeholder="ادخل قيمة القسط"/>
                    </div>
                    <div className='w-25' style={{display:'flex', marginRight:'5%'}}>
                        <p for="input" style={{fontWeight:'900'}}>نسبة التخفيض</p>
                        <input type='number' disabled={isAdd || isDiscount || isCardPay} onChange={e => setDown(e.target.value)} class="input form-control" placeholder="مثال: 10"/>
                    </div>
                </div>
                <button type="button" disabled={isAdd || isCardPay} class="btn btn-primary w-25" style={{marginTop:'24px'}} onClick={addCardPay}>اضافة القسط</button>
                <p className='text-sm-end' style={{marginTop:"48px"}}>الموظف: <strong>{props.entry}</strong></p>
            </div>
        </div>
    )
  }
}


export default Main;