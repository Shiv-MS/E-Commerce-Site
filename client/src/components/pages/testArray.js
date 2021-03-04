const items = [{id:1, title:'example'},{id:2, title:'example2'},{id:1, title:'example'}];

function returnQtys(array){
   const newArray = array.map((item,i)=>{
    let count = array.filter(id => id.id === item.id)
    return {
        id:item.id,
        title: item.title,
        qty:count.length,
    }
    })

    const result = Array.from(new Set(newArray.map(x=>x.id))).map(id =>{
        return{
            id: id,
            title: newArray.find(item => item.id === id).title,
        qty:newArray.find(item => item.id === id).qty
        }
    })
   console.log(result)
}
returnQtys(items);