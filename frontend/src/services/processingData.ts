class ProcessingData{
    selectByType = (data: any)  => {
        const newData = {
            'codeMetrics':{},
            'status': {},
            'submitedMetrics': {},
            'timeMetrics': {},
            'keyboardMetrics': {}
        }
        newData.codeMetrics = this.sortObjects({
            blank_line: data.blank_line.toFixed(2),
            comments: data.comments.toFixed(2),
            lloc: data.lloc.toFixed(2),
            count_if: data.count_if.toFixed(2),
            count_loop: data.count_loop.toFixed(2),
            count_var: data.count_var.toFixed(2)
        })

        newData.submitedMetrics = this.sortObjects({
            tested: data.tested.toFixed(2),
            submited: data.submited.toFixed(2),
            wrong_submit: data.wrong_submit.toFixed(2),
            syntax_error: data.syntax_error.toFixed(2)
        })

        newData.keyboardMetrics = this.sortObjects({
            deleted: data.deleted.toFixed(2),
            writed: data.writed.toFixed(2),
            pasted: data.pasted.toFixed(2)
        })
        
        newData.timeMetrics = {
            focus_time: data.focus_time.toFixed(2),
            writed_time: data.writed_time.toFixed(2),
            jadud: data.jadud.toFixed(2),
            early_often: data.early_often.toFixed(2)
        }

        return newData
    }

    processPrediction = (data: any) => {
        let newData: any = {...data};
        delete newData.passed_probability;
        delete newData.grade_regression
        newData = this.sortObjects(newData);
        return newData
    }

    processGradesPredictions = (data: any) => {
        const grades: any = {
            grade_regression: data.grade_regression.toFixed(2),
            passed_probability: data.passed_probability.toFixed(2)
        }
        return grades
    }

    processWasSorted = (data: any, columns: Array<string>) => {
        let newData: any = {};
        columns.forEach(each => {
            newData[each] = data[each]
        })
        return newData;
    }

    sortObjects = (data: any) => {
        const sortedData = Object.fromEntries(
            Object.entries(data).sort(([,a]: any,[,b]: any) => Math.abs(a)-Math.abs(b))
        );
        return sortedData
    }

    processUrl = () => {
        const url: string = window.location.href
        const query: any = url.split('/')[url.split('/').length - 1];
        const userData: Array<string> = query.split('&');

        let objectAny = {}
        userData.forEach(each => {
            const [key, value] = each.split('=')
            objectAny = {
            ...objectAny,
            [key]: value
            }
        })
        return [query, objectAny]
    }
}

export default new ProcessingData();