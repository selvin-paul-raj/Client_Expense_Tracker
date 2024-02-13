import React from 'react'
import 'boxicons';
import {default as api} from '../store/apiSlice';

export default function List() {
    const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
    const [deleteTransaction] = api.useDeleteTransactionMutation()
    let Transactions;

    
    const handlerClick = (e) => {
        if(!e.target.dataset.id) return 0;
        deleteTransaction({ _id : e.target.dataset.id })
    }

    if(isFetching){
        Transactions = <div>Fetching</div>;
    }else if(isSuccess){
        Transactions = data.map((v, i) => <Transaction key={i} category={v} handler={handlerClick} ></Transaction>);
    }else if(isError){
        Transactions = <div>Error</div>
    }


  return (
    <div className="flex flex-col py-6 gap-3 w-11/12">
        <h1 className='py-4 font-bold text-xl'>History</h1>
        {Transactions}
    </div>
  )
}

function Transaction({ category, handler }){
    if(!category) return null;
    return (
        <div className="item w-11/12 flex justify-center  py-2 rounded-lg border border-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10   " style={{ borderRight : `8px solid ${category.color ??  "#e5e5e5"}`}}>
            <button className='px-3' onClick={handler}><box-icon data-id={category._id ?? ''}  color={category.color ??  "#e5e5e5"} size="15px" name="trash" ></box-icon></button>
            <span className='block w-full'>{category.name ?? ''}</span>
        </div>
    )
}