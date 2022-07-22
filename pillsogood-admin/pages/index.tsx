import type { NextPage } from 'next'
import SessionStorage from "../utils/sessionStorage"
import { Bar } from "react-chartjs-2"
import { CHART_BACKGROUND_COLOR, CHART_BORDER_COLOR } from "../constants/color"
import { gql, useLazyQuery} from "@apollo/client";
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { useState, useEffect } from "react";
import moment from "moment"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import { PageTitle } from "../components/PageTitle"

const GET_LOGS_BY_CREATED_AT = gql`
  query GetLogsByCreatedAt($jwt: String, $createdAt: String) {
    getLogsByCreatedAt(jwt: $jwt, createdAt: $createdAt) {
      _id
      methodName
      createdAt
      count
    }
  }
`

const Home: NextPage = () => {
  Chart.register(CategoryScale, LinearScale, BarElement)
  const [createdAt, setCreatedAt] = useState(moment().format("YYYYMMDD"))
  const [createdAtChartData, setCreatedAtChartData] = useState(null)
  
  const [getCreatedAtNewData, {loading, error, data}] = useLazyQuery(GET_LOGS_BY_CREATED_AT, {
    variables: {
      jwt: SessionStorage.getItem("jwt"),
      createdAt: createdAt
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first'
  });

  useEffect(() => {
    getCreatedAtNewData()
    if(data !== null && data !== undefined) {
      let methodName:string[] = []
      let methodCountData:number[] = []
      for(const methodLog of data.getLogsByCreatedAt) {
        methodName.push(methodLog._id)
        methodCountData.push(methodLog.count)
      }
      setCreatedAtChartData({
          labels:methodName,
          datasets:[
            {
              label: 'dataset',
              data: methodCountData,
              backgroundColor: CHART_BACKGROUND_COLOR,
              borderColor: CHART_BORDER_COLOR,
              borderWidth: 1
            }
          ]
        }
      )
      methodCountData = []
      methodName = []
    }
  }, [data])

  return (
    <div>
      <main>
        <PageTitle title="대시보드"/>
        <div>
          <h2>일자 별 API 호출 현황</h2>
          <DatePicker dateFormat="yyyy-MM-dd" selected={moment(createdAt, "YYYYMMDD").toDate()} onChange={(date) => {setCreatedAt(moment(date).format("YYYYMMDD")); getCreatedAtNewData()}} />
          <div style={{height:'300px',width:'500px'}}>
            {
              createdAtChartData !== null && createdAtChartData !== undefined ? <Bar data={createdAtChartData}/> :<div>데이터가 없습니다.</div>
            }
          </div>
        </div>
        {/* <div>
          <h2>NFT 발행 현황</h2>
            <div style={{height:'300px',width:'500px'}}>
            {
              createdAtChartData !== null && createdAtChartData !== undefined ? <Bar data={createdAtChartData}/> :<div>데이터가 없습니다.</div>
            }
          </div>
        </div> */}
      </main>
    </div>
  )
}

export default Home
