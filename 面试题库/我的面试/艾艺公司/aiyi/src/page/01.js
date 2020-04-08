import React,{useState} from "react";
// import store from "../store/index.js";
import {createStore} from "redux";
// import reducer from "../store/reducers/test.js";



// function My_Component(){
//     return <div>
//         {0}
//         <button>+</button>
//         <button onClick={()=>{}}>新增</button>
//     </div>
// }

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
    console.log(state)
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
    console.log(store.getState().list)
    let [state,setState]=useState({
        list:store.getState().list
    })
    function push(){
        console.log(state)
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
        // if(!localStorage.getItem("data")){
        //     localStorage.setItem("data",JSON.stringify(store.getState().list))
        // }
        localStorage.setItem("data",JSON.stringify(store.getState().list))
    }
    return <div>
        <button onClick={totalAdd}>+</button>
        <button onClick={push}>新增</button>
        
        {(state.list||[]).map((item,index)=>{
            return <div key={index}>
                {item.num}
                <button onClick={()=>{itemAdd(item)}}>+</button>
                <button onClick={()=>{itemDelete(item)}}>删除</button>
            </div>
        })}

        <button className="localStorage_box" onClick={save_localStorage}>保存到localStorage</button>
    </div>
}

export default One;