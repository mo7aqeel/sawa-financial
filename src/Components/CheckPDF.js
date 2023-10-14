import React, { Component, useRef } from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useReactToPrint } from "react-to-print";
import 'bootstrap/dist/css/bootstrap.css'
import { tafqeet } from "./Tafqeet";


const CheckPDF = (props) => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'وصل قبض القسط الدراسي',
    onAfterPrint: () => console.log('Printed PDF successfully!'),
    });


    return(
        <div>
            <div style={{width:'100%', direction:'ltr'}}>
                <button class="learn-more text-center" onClick={props.backClick}>
                    <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">رجوع</span>
                </button>
            </div>
        <div style={{width:'50%'}}>
            <div ref={componentRef} style={{direction:'rtl'}}>
                <nav className="navbar" style={{borderBottom: "2px solid #0A6EBD"}}>
                    <div class="container-sm text-center">
                        <h6 style={{fontWeight:'700'}}>جامعة ساوة الأهلية</h6>
                        <img src="sawa.png" alt="Logo" width="60" height="60" class="d-inline-block align-text-top"/>
                    </div>
                    <p className="text-center p-1 w-100 chaeck-text">وصل قبض الأقساط الدراسية</p>
                </nav>
                <br/>
                <div className="w-100 p-3" style={{display:'inline-block'}}>                
                    <div className="w-100" style={{float:'right'}}>
                        <p className="chaeck-text w-50" style={{float:"right"}}>رقم الوصل : {props.id}</p>
                        <p className="chaeck-text w-50" style={{float:"left"}}>تاريخ الوصل : {props.date}</p>
                        <hr/>
                        <hr/>
                        <hr/>
                        <p className="chaeck-text">اسم الطالب : {props.name}</p>
                        <p className="chaeck-text">القســــــــم : {props.dep}</p>
                        <p className="chaeck-text">المرحلـــــــة : {props.stage}</p>
                        <p className="chaeck-text">القســــــــط : {props.check}</p>
                        <p className="chaeck-text">المبلغ رقماً : {`${new Intl.NumberFormat('en-US').format(props.valNum)} دينار`}</p>
                        <p className="chaeck-text">المبلغ كتابة : {`فقط ${tafqeet(props.valNum)} دينار لا غير`}</p>

                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <p className="text-start p-3" style={{marginLeft:'24px'}}>التوقيع</p>
                <br/>
                <hr/>
                <p className="text-center">شعبة الشؤون المالية</p>
            </div>

            <button className="btn btn-primary text-center m-5 w-25" onClick={handlePrint}>طباعة</button>
        </div>
        </div>
    )
}

export default CheckPDF
