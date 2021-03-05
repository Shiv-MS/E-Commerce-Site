export default function returnQtys(array){
    const newArray = array.map((item,i)=>{
     let count = array.filter(id => id._id === item._id)
     return {
         _id:item._id,
         product_name: item.product_name,
         product_price:item.product_price,
         image:item.image,
         qty:count.length,
     }
     })
//  console.log(newArray);
     const result = Array.from(new Set(newArray.map(x=>x._id))).map(_id =>{
         return{
            _id: _id,
             product_name: newArray.find(item => item._id === _id).product_name,
             product_price:newArray.find(item => item._id === _id).product_price,
             image:newArray.find(item => item._id === _id).image,
         qty:newArray.find(item => item._id === _id).qty
         }
     })
    return result
 }