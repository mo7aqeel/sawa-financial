import {React, useState} from 'react';
import { DataGrid, daDK } from '@mui/x-data-grid';
import 'bootstrap/dist/css/bootstrap.css'
import Select from 'react-select';
import { child, ref, set } from 'firebase/database';
import { myDb } from '../firebase';

const Checkup = (props) => {

    const [check, setCheck] = useState("");
    const [valueCheck, setValueCheck] = useState("");
    const [installment, setInstallment] = useState(0);
    const [isAdd, setIsAdd] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const [down, setDown] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMain, setIsMain] = useState(false)

    let obj = props.infoObj;

    const checks = [
        {value: "checkFirst", label: "القسط الأول"},
        {value: "checkSecond", label: "القسط الثاني"},
        {value: "checkThird", label: "القسط الثالث"},
        {value: "checkFourth", label: "القسط الرابع"}
    ]


    console.log(props.list)

    function addCheckHandler(check, value, dis){

        setIsLoading(true);

        let date = `${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}`;
        let dateCount = valueCheck === "checkFirst"? "dateFirst": valueCheck === "checkSecond"? "dateSecond": valueCheck === "checkThird"? "dateThird": "dateFourth"


        console.log(obj)
        if(set(child(ref(myDb), `system/2023/deps/${obj.dep}/${obj.stageFire}/${obj.key+1}/${check}`), value)
        && set(child(ref(myDb), `system/2023/deps/${obj.dep}/${obj.stageFire}/${obj.key+1}/discount`), dis)
        && set(child(ref(myDb), `system/2023/deps/${obj.dep}/${obj.stageFire}/${obj.key+1}/${dateCount}`), date)){
            console.log("Succeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees");
            setIsAdd(true);
            setIsLoading(false);
            obj[check] = value;
            obj[dateCount] = date;
            
        }
    }

    return(
        <div>
            <div style={{width:'100%', direction:'ltr'}}>
                <button class="learn-more text-center" onClick={props.back}>
                    <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">رجوع</span>
                </button>
            </div>
          {isAdd?<span style={{background:'#000', width:'100%', height:'100%', position:'fixed', opacity:'.2', transition:'all .3s'}}></span>: false}
            <div className='p-5 text-sm-center'>

                <div className='text-sm-center' style={{display:'flex', width:'100%', justifyContent:'center'}}>
                    <h5 style={{marginLeft:'5%'}}>اسم الطالب : <strong>{obj.name}</strong></h5>
                    <h5 style={{marginLeft:'5%'}}>القسم : <strong>{obj.dep}</strong></h5>
                    <h5>المرحلة : <strong>{obj.stage}</strong></h5>
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
                            <h6 class="message">رقم الوصل : 00054</h6> 
                            <h6 class="message">تاريخ الوصل : 3/10/2023</h6> 
                        </div> 
                        <div class="actions">
                            <button type="button" class="btn btn-outline-success w-100" style={{marginTop: '0.3rem'}} onClick={() => setIsAdd(false)}>موافق</button> 
                            <button type="button" class="btn btn-outline-secondary w-100" style={{marginTop: '0.75rem'}} onClick={() => setIsAdd(false)}>تعديل</button> 
                        </div> 
                    </div> 
                </div>
                :false}




                <table class="table table-striped-columns text-sm-center w-100" style={{marginTop:'64px'}}>
                    <thead>
                        <tr>
                            <th scope="col">القسط الأول</th>
                            <th scope="col">معلومات القسط الأول</th>
                            <th scope="col">القسط الثاني</th>
                            <th scope="col">معلومات القسط الثاني</th>
                            <th scope="col">القسط الثالث</th>
                            <th scope="col">معلومات القسط الثالث</th>
                            <th scope="col">القسط الرابع</th>
                            <th scope="col">معلومات القسط الرابع</th>
                            <th scope="col" style={{fontWeight:'900'}}>المبلغ المستلم</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{obj.checkFirst}</td>
                            <td>{obj.dateFirst}</td>
                            <td>{obj.checkSecond}</td>
                            <td>{obj.dateSecond}</td>
                            <td>{obj.checkThird}</td>
                            <td>{obj.dateThird}</td>
                            <td>{obj.checkFourth}</td>
                            <td>{obj.dateFourth}</td>
                            <td style={{fontWeight:'900'}}>{obj.sum}</td>
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
                        options={checks}
                        value={checks.filter(obj => check.includes(obj.label))}
                        onChange={e => {setCheck(e.label) 
                            setValueCheck(e.value)}}
                        placeholder="القسط"
                        isDisabled={isAdd}
                        isSearchable={false}
                        name="checks"
                    />
                    </div>
                    <div className='w-25' style={{display:'flex', marginRight:'5%'}}>
                        <p for="input" style={{fontWeight:'900'}}>قيمة القسط</p>
                        <input type='number' disabled={isAdd} onChange={e => setInstallment(e.target.value)} class="input form-control" placeholder="ادخل قيمة القسط"/>
                    </div>
                    <div className='w-25' style={{display:'flex', marginRight:'5%'}}>
                        <p for="input" style={{fontWeight:'900'}}>نسبة التخفيض</p>
                        <input type='text' disabled={isAdd} onChange={e => setDown(e.target.value)} class="input form-control" placeholder="مثال: 10%"/>
                    </div>
                </div>
                <button type="button" disabled={isAdd} class="btn btn-primary w-25" style={{marginTop:'24px'}} onClick={() => addCheckHandler(valueCheck, installment, down)}>اضافة القسط</button>
                <p className='text-sm-end' style={{marginTop:"48px"}}>المدخل: <strong>ديار ضامد</strong></p>
            </div>
        </div>
    )
}

export default Checkup;