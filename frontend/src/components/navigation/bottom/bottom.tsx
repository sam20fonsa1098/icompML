import React, { useState, useContext, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import useWindowDimensions from '../../../hooks/windowHook/window';
import { OpenContext } from '../../../containers/user';
import { drawerWidth } from '../../../shared/constants';

import SwalCustomized from '../../../services/swal';
import Axios from '../../../services/api';
import ProcessingData from '../../../services/processingData';
import { questionsMetrics, serie } from '../../../shared/interfaces';

import UserChart from '../../../containers/user/userChart/userChart';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ScrollableTabsButtonForce = (props: questionsMetrics) => {
    let classes = useStyles();
    const [value, setValue] = useState(0);
    const { height, width } = useWindowDimensions();
    const isOpen = useContext(OpenContext);

    const [assessmentId, setAssessmentId] = useState<number>(props.list[0].assessment_id);
    const [codeMetricsOptions, setCodeMetricsOptions] = useState<Array<string>>([]);
    const [codeMetricsSeries, setCodeMetricsSeries] = useState<Array<serie>>([]);
    const [submitedMetricsOptions, setSubmitedMetricsOptions] = useState<Array<string>>([]);
    const [submitedMetricsSeries, setSubmitedMetricsSeries] = useState<Array<serie>>([]);
    const [keyboardMetricsOptions, setKeyboardMetricsOptions] = useState<Array<string>>([]);
    const [keyboardMetricsSeries, setKeyboardMetricsSeries] = useState<Array<serie>>([]);
    const [timeMetricsOptions, setTimeMetricsOptions] = useState<Array<string>>([]);
    const [timeMetricsSeries, setTimeMetricsSeries] = useState<Array<serie>>([]);
    const [gradeStatus, setGradeStatus] = useState<Array<serie>>([]);



    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    const cleanMetrics = () => {
        setCodeMetricsSeries([]);
        setSubmitedMetricsSeries([]);
        setKeyboardMetricsSeries([]);
        setTimeMetricsSeries([]);
        setGradeStatus([]);
    }

        
    const updateData = (currentData: any, message: string) => {
        const transformedData = ProcessingData.selectByType(currentData);
        setCodeMetricsSeries(code => [...code, {name: message, data: Object.values(transformedData.codeMetrics)}]);
        setCodeMetricsOptions(Object.keys(transformedData.codeMetrics));
        setSubmitedMetricsSeries(submited => [...submited, {name: message, data: Object.values(transformedData.submitedMetrics)}]);
        setSubmitedMetricsOptions(Object.keys(transformedData.submitedMetrics));
        setKeyboardMetricsSeries(keyboard => [...keyboard, {name: message, data: Object.values(transformedData.keyboardMetrics)}]);
        setKeyboardMetricsOptions(Object.keys(transformedData.keyboardMetrics));
        setTimeMetricsSeries(time => [...time, {name: message, data: Object.values(transformedData.timeMetrics)}]);
        setTimeMetricsOptions(Object.keys(transformedData.timeMetrics));
        setGradeStatus(grade => [...grade, {name: message, data: [currentData['grade'].toFixed(2)]}]);
    }

    const getQuestion = (data: any) => {
        try {
            updateData(data, 'You');
        } catch (err) {
            SwalCustomized.processError(err);
        }
    }

    const getQuestionGroupByClass = async (id: number) => {
        try {
            const [, objectAny] = ProcessingData.processUrl();
            const resp:any = await Axios.get(`/questions?class_id=${objectAny.class_id}&assessment_id=${id}`);
            updateData(resp.data[0], "Your Class");
        } catch (err) {
            SwalCustomized.processError(err);
        }
    }

    const selectData = (id: number, condition: boolean = true) => {
        if (id === assessmentId && condition) {
            return
        }
        cleanMetrics();
        setAssessmentId(id);
        const filteredList: Array<any> = props.list.filter(each => {
            if (each.assessment_id === id) {
                return each
            }
        })
        getQuestion(filteredList[0]);
        getQuestionGroupByClass(id);
    }

    useEffect(() => {
        selectData(assessmentId, false);
    }, [])

    return (
        <>
        <div className={classes.root} style={{width: isOpen ? width - drawerWidth * 1.3 : width - drawerWidth * 0.7}}>
            <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
            >
            {props.list.map((each, index) => 
                <Tab 
                    onClick={() => selectData(each.assessment_id)} 
                    key={each.assessment_id} 
                    label={each.assessment_id}
                    {...a11yProps(index)}/>
            )}
            </Tabs>
            </AppBar>
        </div>
        <UserChart
            codeMetricsSeries={codeMetricsSeries}
            codeMetricsOptions={codeMetricsOptions}
            keyboardMetricsSeries={keyboardMetricsSeries}
            keyboardMetricsOptions={keyboardMetricsOptions}
            timeMetricsSeries={timeMetricsSeries}
            timeMetricsOptions={timeMetricsOptions}
            gradeStatus={gradeStatus}
            submitedMetricsSeries={submitedMetricsSeries}
            submitedMetricsOptions={submitedMetricsOptions}
        /> 
        </>
    );
}

export default ScrollableTabsButtonForce;