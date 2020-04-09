import React,{useState} from "react";
import {createStore} from "redux";
import "./test.less";


const PUBLIC_PUSH="PUBLIC_PUSH";
const ITEM_ADD="ITEM_ADD";
const TOTAL_ADD="TOTAL_ADD";
const ITEM_DELETE="ITEM_DELETE";

let list=localStorage.getItem("data")?JSON.parse(localStorage.getItem("data")):[];
let initState={
    list:list
}

function reducer(state=initState,action){
    state=JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "PUBLIC_PUSH":
            state.list.push({
                num:0,
                id:Date.now()
            });
            break;
        case "TOTAL_ADD":
            state.list.forEach(item=>{
                item.num++;
            })
            break;
        case "ITEM_ADD":
            state.list.map(item=>{
                if(item.id===action.id){
                    item.num++;
                }
                return item;
            })
            break;
        case "ITEM_DELETE":
            state.list=state.list.filter(item=>{
                return item.id!==action.id;
            })
            break;
    }
    return state;
}

let store=createStore(reducer);



function One(){
    let [state,setState]=useState({
        list:store.getState().list
    })
    function push(){
        store.dispatch({type:PUBLIC_PUSH});
        setState({
            ...state,
            list:store.getState().list
        })
    }
    function totalAdd(){
        store.dispatch({type:TOTAL_ADD});
        setState({
            ...state,
            list:store.getState().list
        })
    }
    function itemAdd(item){
        store.dispatch({type:ITEM_ADD,id:item.id});
        setState({
            ...state,
            list:store.getState().list
        })
    }
    function itemDelete(item){
        store.dispatch({type:ITEM_DELETE,id:item.id});
        setState({
            ...state,
            list:store.getState().list
        })
    }
    function save_localStorage(){
        localStorage.setItem("data",JSON.stringify(store.getState().list))
    }
    return <div className="box">
        <button onClick={totalAdd} className="add default">+</button>
        <button onClick={push}>新增</button>
        
        {(state.list||[]).map((item,index)=>{
            return <div key={index}>
                <div className="number">{item.num}</div>
                <button onClick={()=>{itemAdd(item)}} className="add">+</button>
                <button onClick={()=>{itemDelete(item)}} className="delete">删除</button>
            </div>
        })}

        <button onClick={save_localStorage} className="localStorage_button">保存到localStorage</button>

    </div>
}

export default One;