import {React, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Select from 'react-select';
import { child, ref, set } from "firebase/database";
import { myDb } from "../firebase";



const Setting = (propse) => {

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


      const [dep, setDep] = useState("");
      const [stage, setStage] = useState("")
      const [val, setVal] = useState("");

      const [isError, setIsError] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");

      const [isAdd, setIsAdd] = useState(false);
      const [isSuccess, setIsSuccess] = useState(false);


      const addInstallmentHandler = () => {

        setIsError(false);
        let stageCount =  stage === "الأولى"? "first": stage === "الثانية"? "second": stage === "الثالثة"? "third": "fourth";

        if(set(child(ref(myDb), `system/2023/deps/${dep}/${stageCount}/mainCheck`), val)) {
          setIsAdd(false)
          setIsSuccess(true)

          setTimeout(() => setIsSuccess(false), 3000);
        
        }
      }

    return(
        <div className="">

          {isAdd?
            <div class="cardPayS">
            <svg xmlns="http://www.w3.org/2000/svg" style={{width:'30%'}} viewBox="0 0 24 24"><path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"/></svg>
            <p class="cookieHeading">تثبيت القسط</p>
            <p class="cookieDescription">هل متأكد من تغيير القسط الحالي لهذا القسم</p>

            <div class="buttonContainer">
              <button class="declineButton" onClick={() => setIsAdd(false)}>إلغاء</button>
              <button class="acceptButton" onClick={addInstallmentHandler}>موافق</button>
            </div>
          </div> : false}

            {isSuccess?
              <div class="alert alert-success" role="alert" style={{position:'fixed'}}>
                تم تثبيت القسط بنجاح!
              </div>
          :false}

          {isError? 
                <div class="alert alert-danger" role="alert">
                    {errorMessage}
                </div>: 
                false}
            <div style={{width:'100%', direction:'ltr'}}>
                <button class="learn-more text-center" onClick={propse.backClick}>
                    <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">رجوع</span>
                </button>
            </div>
            <h3 className="text-center p-3">اعدادات الاقساط الدراسية</h3>

            <br/>
            <br/>

            <div className='w-100 p-3 text-cetnter' style={{display:'flex', textAlign:'center'}}>
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
            <input type="number" onChange={e => setVal(e.target.value)} placeholder="قيمة القسط" className="form-control w-25" style={{marginRight:'32px'}}/>
          </div>

          <button className="btn btn-primary w-25" onClick={() => {
            if (dep === "" || stage === "" || val === ""){
              setIsError(true);
              setErrorMessage("يجب ادخال الحقول المطلوبة");
              return;
            }
            setIsAdd(true);
          }
          } style={{marginRight:'35%', marginTop:'64px'}}>تأكيد</button>

            
        </div>
    )
}

export default Setting