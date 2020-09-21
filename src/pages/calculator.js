import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import {isMobile} from "react-device-detect";

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputBase from '@material-ui/core/InputBase';

import copy from '../assets/copy.png';


const Styles = styled.div`

    .background{
        z-index: -3;
        position: absolute;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(180deg, #05f, #09f);
        background-repeat: no-repeat;
        display: flex;
    }

    .title{
        position: absolute;
        z-index: 2;
        color: white;
        ${isMobile ? 
          `    
          font-size: calc(8vh);
          top: 0;
          left: calc(39vw);
          `
          :
          `
          font-size: calc(8vw);
          top: -1%;
          left: calc(45vw);
          `
        }
        font-weight: bold;
        justify-content: center;
        align-items: center;
        display: inline-block;
      }

    .inputBoxContainer {
        position: absolute;
        display: flex;
        overflow: show;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        ${isMobile ?
          `
          top: calc(18%);
          height: calc(60%);
          width: calc(80%);
          `
          :
          `
          top: calc(18%);
          height: calc(60%);
          width: calc(60%);
          `
        }
    }

    .outputBoxContainer {
        position: absolute;
        display: flex;
        overflow: show;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 25px;
        ${isMobile ?
          `
          top: calc(83%);
          height: calc(10%);
          width: calc(90%);
          
          `
          :
          `
          top: calc(83%);
          height: calc(10%);
          width: calc(80%);
          `
        }
    }

    .repaymentType{
        position: absolute;
        z-index: 2;
        ${isMobile ? 
          `    
          font-size: calc(4vh);
          top: 23%;
          left: calc(25vw);
          `
          :
          `
          font-size: calc(4vw);
          top: 23%;
          left: calc(25vw);
          `
        }
        font-weight: bold;
        justify-content: center;
        align-items: center;
        display: inline-block;
      }

    .size{
        position: absolute;
        z-index: 2;
        ${isMobile ? 
          `    
          font-size: calc(4vh);
          top: 33%;
          left: calc(25vw);
          `
          :
          `
          font-size: calc(4vw);
          top: 33%;
          left: calc(25vw);
          `
        }
        font-weight: bold;
        justify-content: center;
        align-items: center;
        display: inline-block;
      }

      .rate{
        position: absolute;
        z-index: 2;
        ${isMobile ? 
          `    
          font-size: calc(4vh);
          top: 43%;
          left: calc(25vw);
          `
          :
          `
          font-size: calc(4vw);
          top: 43%;
          left: calc(25vw);
          `
        }
        font-weight: bold;
        justify-content: center;
        align-items: center;
        display: inline-block;
      }

      .term{
        position: absolute;
        z-index: 2;
        ${isMobile ? 
          `    
          font-size: calc(4vh);
          top: 53%;
          left: calc(25vw);
          `
          :
          `
          font-size: calc(4vw);
          top: 53%;
          left: calc(25vw);
          `
        }
        font-weight: bold;
        justify-content: center;
        align-items: center;
        display: inline-block;
      }

      .frequency{
        position: absolute;
        z-index: 2;
        ${isMobile ? 
          `    
          font-size: calc(4vh);
          top: 63%;
          left: calc(25vw);
          `
          :
          `
          font-size: calc(4vw);
          top: 63%;
          left: calc(25vw);
          `
        }
        font-weight: bold;
        justify-content: center;
        align-items: center;
        display: inline-block;
      }

      .result{
        position: absolute;
        z-index: 2;
        ${isMobile ? 
          `    
          font-size: calc(4vh);
          top: 83%;
          left: calc(15vw);
          `
          :
          `
          font-size: calc(4vw);
          top: 83%;
          left: calc(15vw);
          `
        }
        font-weight: bold;
        justify-content: center;
        align-items: center;
        display: inline-block;
      }

      .copyButton{
        position: absolute;
        z-index: 2;
        ${isMobile ? 
          `    
          font-size: calc(2vh);
          top: calc(88% - 3.5vmin);
          left: 92%;
          `
          :
          `
          font-size: calc(2vw);
          top: calc(88% - 3.5vmin);
          left: 92%;
          `
        }
        font-weight: bold;
        display: inline-block;
        background: white;
        border-radius: 50%;
        position: absolute;
        width: calc(7vmin);
        height: calc(7vmin);
        border: white;
        justify-content: center;
        align-items: center;
      }

      

`;

const possibleFreqs = [
    'weekly',
    'fortnightly',
    'monthly',
    'annually',
];

const possibleRepaymentTypes = [
    'principal and interest',
    'interest only',
];



//Code sourced from https://stackoverflow.com/questions/5294074/pmt-function-in-javascript 
function PMT(rate, nperiod, pv, fv, type) {

    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate === 0) return (pv + fv)/nperiod;

    var pvif = Math.pow(1 + rate, nperiod);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type === 1) {
        pmt /= (1 + rate);
    };

    return -pmt;
}
//End of sourced code

function workOutRepayments(size,rate,term,frequency,repaymentType){

    var nPeriods ; //nPeriods is the number of periods based on frequency, default is 12

    if(frequency==="annually"){
        nPeriods = 1;
    } 
    else if(frequency==="monthly"){
        nPeriods = 12;
    }else if(frequency==="fortnightly"){
        nPeriods = 26;
    }else if(frequency==="weekly"){
        nPeriods = 52;
    }else {
        return "Enter a frequency";
    }

    if(term===0){
        return "Enter a loan term";
    }

    if(repaymentType === "principal and interest"){
        return "Repayments are $" + (PMT(rate/1200,term*12,size)*(12/nPeriods)).toFixed(2) + " " + frequency;
    }else if(repaymentType === "interest only"){
        return "Repayments are $" + (size*(rate/100)/nPeriods).toFixed(2) + " " + frequency;
    }else{
        return "Enter a repayment type";
    }
    
}



export const Calculator = () => {
    
    const [size, setSize] = useState(500000);
    const [rate, setRate] = useState(2.29);
    const [term, setTerm] = useState(30);
    const [frequency, setFrequency] = useState("monthly");
    const [repaymentType, setRepaymentType] = useState("principal and interest");
    

    const sanitiseAndSetSize = (size) => {

        if(size>10000000){
            setSize(10000000);
        }
        else if(size<0){
            setSize(0);
        }else{
            setSize(size);
        }
        
    };

    const sanitiseAndSetRate = (rate) => {

        if(rate>30){
            setRate(30);
        }
        else if(rate<0){
            setRate(0);
        }else{
            setRate(rate);
        }
        
    };

    

    const sanitiseAndSetTerm = (term) => {

        if(term>30){
            setTerm(30);
        }
        else if(term<0){
            setTerm(0);
        }else{
            setTerm(term);
        }
        
    };

    const aOrAn = (repaymentType) => {

        
        if(repaymentType==="principal and interest"){
            return;
        }else if(repaymentType==="interest only"){
            return "n";
        }else{
            return "error";
        }
        
    };

    
    

    return(

        <Styles>
            <motion.div className="background"  >

                <motion.div className="title">
                    Blu
                </motion.div>
                <motion.div className="inputBoxContainer"/>
                <motion.div className="outputBoxContainer"/>
                    
                    <motion.div className="repaymentType">
                        For a{aOrAn(repaymentType)}
                        <FormControl size="small">
                            
                            <Select
                            disableUnderline
                            IconComponent = {"none"}
                            value={repaymentType}
                            onChange={e => setRepaymentType(e.target.value)}
                            input={<Input/>}
                            renderValue={(selected) => {
                                return selected;
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{
                                color:'#ffffff',
                                fontSize: '4vw',
                                fontWeight: 'bold',
                                marginLeft: '0.25em',
                            }}>
                                <MenuItem disabled value="">
                                    <em>Enter repayment type</em>
                                </MenuItem>

                                {possibleRepaymentTypes.map((possibleRepaymentType) => (
                                    <MenuItem key={possibleRepaymentType} value={possibleRepaymentType} >
                                    {possibleRepaymentType}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </motion.div>

                    <motion.div className="size">
                        loan of $
                        <FormControl size="small">
                            <InputBase
                                id="standard-adornment-size"
                                value={size}
                                onChange={e => sanitiseAndSetSize(e.target.value)}
                                style={{
                                    color:'#ffffff',
                                    fontSize: '4vw',
                                    fontWeight: 'bold',
    
                                }}
                            />
                        </FormControl>
                    </motion.div>
                    <motion.div className="rate">
                        with a rate of 
                        <FormControl size="small">
                            <InputBase
                                
                                id="standard-adornment-rate"
                                value={rate}
                                onChange={e => sanitiseAndSetRate(e.target.value)}
                                style={{
                                    color:'#ffffff',
                                    fontSize: '4vw',
                                    fontWeight: 'bold',
                                    marginLeft: '0.25em',
                                    width: "3.6ch",
                                }}
                                
                                
                            />
                        </FormControl>
                        % p.a.
                    </motion.div>
                    <motion.div className="term">
                        a loan term of
                        <FormControl size="small">
                            <InputBase 
                                id="standard-adornment-term"
                                value={term}
                                onChange={e => sanitiseAndSetTerm(e.target.value)}
                                style={{
                                    color:'#ffffff',
                                    fontSize: '4vw',
                                    fontWeight: 'bold',
                                    marginLeft: '0.25em',
                                    width: '2.5ch',
                                }}
                                

                            />
                        </FormControl>
                         years
                    </motion.div>
                    
                    <motion.div className="frequency">
                         and repayments
                        <FormControl size="small">
                            <Select
                            disableUnderline
                            IconComponent = {"none"}
                            value={frequency}
                            onChange={e => setFrequency(e.target.value)}
                            input={<Input/>}
                            renderValue={(selected) => {
                                return selected;
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{
                                color:'#ffffff',
                                fontSize: '4vw',
                                fontWeight: 'bold',
                                marginLeft: '0.25em',
                                
                            }}
                            >
                                <MenuItem disabled value="">
                                    <em>Enter frequency</em>
                                </MenuItem>

                                {possibleFreqs.map((possibleFreq) => (
                                    <MenuItem key={possibleFreq} value={possibleFreq} >
                                    {possibleFreq}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </motion.div>

                    
                    
                    <motion.div className="result">
                        {workOutRepayments(size,rate,term,frequency,repaymentType)}. 
                    </motion.div>
                    <button className="copyButton" onClick={() => {navigator.clipboard.writeText(workOutRepayments(size,rate,term,frequency,repaymentType))}}>
                        <img src={copy} style={{height:'3vmin', width:'3vmin'}} alt="copy"/>
                    </button>
                
            </motion.div>
           
        </Styles>
  
)}