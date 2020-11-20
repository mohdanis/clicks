/**
 * JSON data Array clicks
 */
const clicks = [
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 02:02:58", "amount": 7.00 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 02:12:32", "amount": 6.50 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 02:13:11", "amount": 7.25 },
    { "ip":"44.44.44.44", "timestamp":"3/11/2016 02:13:54", "amount": 8.75 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 05:02:45", "amount": 11.00 },
    { "ip":"44.44.44.44", "timestamp":"3/11/2016 06:32:42", "amount": 5.00 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 06:35:12", "amount": 2.00 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 06:45:01", "amount": 12.00 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 06:59:59", "amount": 11.75 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 07:01:53", "amount": 1.00 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 07:02:54", "amount": 4.50 },
    { "ip":"33.33.33.33", "timestamp":"3/11/2016 07:02:54", "amount": 15.75 },
    { "ip":"66.66.66.66", "timestamp":"3/11/2016 07:02:54", "amount": 14.25 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 07:03:15", "amount": 12.00 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 08:02:22", "amount": 3.00 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 09:41:50", "amount": 4.00 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 10:02:54", "amount": 5.00 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 11:05:35", "amount": 10.00 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 13:02:21", "amount": 6.00 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 13:02:40", "amount": 8.00 },
    { "ip":"44.44.44.44", "timestamp":"3/11/2016 13:02:55", "amount": 8.00 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 13:33:34", "amount": 8.00 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 13:42:24", "amount": 8.00 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 13:47:44", "amount": 6.25 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 14:02:54", "amount": 4.25 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 14:03:04", "amount": 5.25 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 15:12:55", "amount": 6.25 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 16:02:36", "amount": 8.00 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 16:22:11", "amount": 8.50 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 17:18:19", "amount": 11.25 },
    { "ip":"55.55.55.55", "timestamp":"3/11/2016 18:19:20", "amount": 9.00 },
    { "ip":"22.22.22.22", "timestamp":"3/11/2016 23:59:59", "amount": 9.00 }
  ];


/**
 * 
 * @param {filter data for each ip} data
 */
const filterClicksArr = function(data) {
	const finalArray = [];
	data.forEach(obj => {
		const item = finalArray.find(item => new Date(item.timestamp).getHours() === new Date(obj.timestamp).getHours());
		if(item) {
			const index = finalArray.findIndex(item => new Date(item.timestamp).getHours() === new Date(obj.timestamp).getHours());
			if(item.amount < obj.amount) {
				finalArray.splice(index, 1, obj);
			}
			return;
		}
		finalArray.push(obj);
	});
	return finalArray;
};
/**
 * 
 * @param {clicks original JSON array} clicks 
 */
const getClicksSubset = function(clicks) {
	const clicksTempObj = {};
	const subsetArr = [];
	for(let i = 0; i < clicks.length; i++) {
		if(clicks[i].ip in clicksTempObj) {
			clicksTempObj[clicks[i].ip].push(clicks[i]);
		} else {
			clicksTempObj[clicks[i].ip] = new Array();
			clicksTempObj[clicks[i].ip].push(clicks[i]);
		}
		if(i === clicks.length - 1) {
			for(let key in clicksTempObj) {
				clicksTempObj[key] = clicksTempObj[key].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
				if(clicksTempObj[key].length === 1) {
					subsetArr.push(clicksTempObj[key][0]);
				} else if(clicksTempObj[key].length <= 10) {
					subsetArr.push(...filterClicksArr(clicksTempObj[key]));
				}
				//  else if(clicksTempObj[key].length > 10){
				//      delete clicksTempObj[key];
				//  }  
			}
			console.log('Filter clicks Array Temp object with each IP>>>>>', clicksTempObj);
            console.log('Final Subset Clicks Array >>>>>', subsetArr);
            return subsetArr;
		}
	}
};
getClicksSubset(clicks);
