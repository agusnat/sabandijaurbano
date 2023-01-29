class SheetsJson {
    constructor(sheetID){
        this.sheetUrl = 'https://docs.google.com/spreadsheets/d/' + sheetID + '/gviz/tq?tqx=out:json&tq&gid=0';
    }

    saveData(arr){
        localStorage.setItem('table', JSON.stringify(arr));
    }

    loadData() {
		let arr = JSON.parse(localStorage.getItem('table'));

        if(arr){
            let now = new Date();

            if (now.getTime() <= arr.expiry)
                return Promise.resolve(arr.table);
        }

        return fetch(this.sheetUrl).then(response => response.text()).then(data => this.parseJson(data));
	}

    parseJson(json_data){        
        let data = JSON.parse(json_data.substring(47).slice(0, -2));
        let cols = data.table.cols;
        let rows = data.table.rows;
        let result = {};
        
        let now = new Date();
        result['expiry'] = (now.getTime() + 30000);
        
        let table = [];

        for(let i in rows)
        {
            let arr = {};

            for(let j in cols){
                let label = cols[j].label;
                let value = '';
                
                if(rows[i].c[j])
                    value = rows[i].c[j].v;

                if(!label)
                    label = j;

                arr[label] = value;
            }

            table.push(arr);
        }
        result['table'] = table;

        this.saveData(result);

        return result.table;
    }
}