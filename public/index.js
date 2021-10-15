

const allData = {};
function getxml(startD, endD){
    fetch('http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=2AZiZQ6Z2QXS6brBNaXsurvGKwSWpLdWhHb7695FsbCGs7Lt6zlvHhs%2FzwV0%2FHuvPOZYKLq9R3Q9i5Q2BES0Jg%3D%3D&pageNo=1&numOfRows=10&startCreateDt='+startD+'&endCreateDt='+endD).then((response) => response.text()).then(data => {
    allData[startD+'-'+endD] = data;

});
}
const allDate = [
    ['20200301', '20200331'],
    ['20200401', '20200430'],
    ['20200501', '20200531'],
    ['20200601', '20200630'],
    ['20200701', '20200731'],
    ['20200801', '20200831'],
    ['20200901', '20200930'],
    ['20201001', '20201031'],
    ['20201101', '20201130'],
    ['20201201', '20201231'],
    ['20210101', '20210131'],
    ['20210201', '20210228'],
    ['20210301', '20210331'],
    ['20210401', '20210430'],
    ['20210501', '20210531'],
    ['20210601', '20210630'],
    ['20210701', '20210731']
];

allDate.forEach(date => {
    getxml(date[0], date[1]);
});

const completedData = {};

function splitData(text, toDate){
    const datas = text.split("<item>");
    const lastData = {};
    datas.forEach(data => {
        if(data.indexOf("<gubun>") != -1){
            const gubun = data.substr(data.indexOf("<gubun>")+7, 2);
            const incDec = data.substring(data.indexOf("<incDec>")+8, data.indexOf("</incDec>")-1);
            if(lastData.hasOwnProperty(gubun)){
                lastData[gubun] = lastData[gubun] + parseInt(incDec);
            }else{
                lastData[gubun] = parseInt(incDec);
            }
        }
    });
    completedData[toDate] = lastData;
}