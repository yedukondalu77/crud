import { Button, Card,Table } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



let api = axios.create({
    baseURL:'http://192.168.155.114:3005'
})
const DB_Mobiles = () => {
    const [data,Setdata]=useState([])
    useEffect(()=>{GetMobiles()},[])
    const GetMobiles = async ()=>{
        let result = await api.get('/mobiles')
        console.log(result.data)
        Setdata(result.data)
    }
    
  return (
    <div style={{padding:'50px 30px'}}>
    <Card shadow="sm" padding="lg" radius="md" withBorder >
      <Table striped withBorder withColumnBorders>
        <thead >
            <tr style={{backgroundColor:"#EBEDF4"}}>
                <th >ID</th>
                <th>MOBILE NAME</th>
                <th>PRICE</th>
                <th>RAM</th>
                <th>STORAGE</th>
                <th>VIEW</th>
                <th>EDIT</th>
                <th>DELETE</th>
            </tr>
        </thead>
        <tbody>
            { data.map((d,index)=><tr key={index} style={{cursor:'pointer'}}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.price}</td>
                <td>{d.ram}</td>
                <td>{d.storage}</td>
                <td><Button>VIEW</Button></td>
                <td><Button>EDIT</Button></td>
                <td><Button>DELETE</Button></td>
                </tr>)
               }
        </tbody>
      </Table>
    </Card>
    </div>
  )
}

export default DB_Mobiles

