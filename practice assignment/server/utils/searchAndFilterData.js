const filterData =(data, search, d, filter)=>{
    let ans=[];
    search=search.toLowerCase();

    function filterNestedObj(obj, cd){
        if(cd <= d){
            if(obj.title.toLowerCase().includes(search) || obj.description.toLowerCase().includes(search)) {
                ans.push(obj);
            }
            if(obj[filter]){
                obj[filter].forEach((i)=>{
                    filterNestedObj(i,cd+1);
                })
            }
        }
    }
    return ans;

}
module.exports = {
    filterData,
}