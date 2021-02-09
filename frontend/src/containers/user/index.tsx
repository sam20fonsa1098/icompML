import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { customStyles, customIcons } from '../../shared/constants';
import { serie } from '../../shared/interfaces';

import ProcessingData from '../../services/processingData';
import SwalCustomized from '../../services/swal';
import Axios from '../../services/api';

import PredictionsChart from './predictionsChart/predictionsChart';
import ProbabilityChart from './probabiltyChart/probabilityChart';
import CustomBottomNavigation from '../../components/navigation/bottom/bottom';

export const OpenContext = React.createContext(false);

const User = () => {
  const classes = customStyles();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Predictions');
  
  const [gradePredictions, setGradePredictions] = useState<Array<any>>([]);
  const [gradePredictionsOptions, setGradePredictionsOptions] = useState<Array<string>>([]);
  
  const [predictionMetricsOptions, setPredictionMetricsOptions] = useState<Array<string>>([]);
  const [predictionMetricsSeries, setPredictionMetricsSeries] = useState<Array<serie>>([]);
  
  const [maxSessions, setMaxSessions] = useState(0);
  const [list, setList] = useState<Array<any>>([]);

  const onClickDrawerOption = (currentTitle: string) => {
    if (currentTitle !== title) {
      setTitle(currentTitle);
    }
  }

  const handleDrawer = (condition: boolean) => {
    setOpen(condition);
  };

  const updateGradeData = (data: any, index: number) => {
    let grades: any;
    grades = ProcessingData.processGradesPredictions(data);
    setGradePredictions(grade => {
      return [...grade, grades.passed_probability * 100]
    });
    setGradePredictionsOptions(options => {
      return [...options, `s${index + 1}`]
    });
  }

  const udpateData = (data: any, index: number, columns: Array<string>) => {
    let values: Array<any>
    let newData: any;
    setPredictionMetricsSeries(predictions => {
      if (predictions.length === 0) {
        newData = ProcessingData.processPrediction(data);
        columns = Object.keys(newData);
        setPredictionMetricsOptions(columns);
      } else {
        newData = ProcessingData.processWasSorted(data, columns)
      }
      values = Object.values(newData).map((each: any) => {
        return (each * 100).toFixed(2)
      })
      return [...predictions, {name: `s${index + 1}`, data: values}]
    });
    return columns
  }

  const getShapePredictions = useCallback(() => {
    const [, objectAny] = ProcessingData.processUrl();
    Axios.get(`/predictions?user_id=${objectAny.user_id}&class_id=${objectAny.class_id}`)
      .then(resp => {
        const dataArray: Array<any> = resp.data;
        let columns: Array<string>;
        setMaxSessions(dataArray.length)
        dataArray.forEach((data, index) => {
          columns = udpateData(data, index, columns)
          updateGradeData(data, index)
        })
      })
      .catch(err => {
        SwalCustomized.processError(err);
      })
  }, [])

  const getDataQuestions = useCallback(() => {
    const [, objectAny] = ProcessingData.processUrl();
    Axios.get(`/questions?user_id=${objectAny.user_id}&class_id=${objectAny.class_id}`)
      .then(resp => {
        const listData: Array<any> = resp.data;
        listData.forEach(data => {
          setList(eachList => [...eachList, data])
        })
      })
      .catch(err => {
        SwalCustomized.processError(err);
      })
  }, [])

  useEffect(() => {
    if (title === "Predictions") {
      if (maxSessions === 0) {
        getShapePredictions();
      }
    } else {
      if (list.length === 0) {
        getDataQuestions();
      }
    }
  }, 
  [
    maxSessions, 
    getShapePredictions, 
    title,
    getDataQuestions
  ])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawer(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
          <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => handleDrawer(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {customIcons.map((item) => (
            <ListItem button key={item.name} onClick={() => onClickDrawerOption(item.name)}>
              <ListItemIcon><item.icon/></ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <OpenContext.Provider value={open}>
          {title === "Predictions" ?
          <>
            <PredictionsChart
                    predictionMetricsOptions={predictionMetricsOptions}
                    predictionMetricsSeries={predictionMetricsSeries}
                    maxSessions={maxSessions}/>
            <ProbabilityChart
                    gradePredictionsOptions={gradePredictionsOptions}
                    gradePredictions={gradePredictions}
                    maxSessions={maxSessions}/>
          </> 
          : 
          list.length > 0 ? 
          <CustomBottomNavigation 
            list={list}/> 
          : null}
        </OpenContext.Provider>
      </main>
    </div>
  );
}

export default User;