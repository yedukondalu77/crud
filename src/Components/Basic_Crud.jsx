import { Card, Table, Modal,Group,Button,TextInput, Select, Avatar } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { FaRegEye, FaUserEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

let api= axios.create({
  baseURL:'http://localhost:3002'
})

const Basic_Crud = () => {
  const form = useForm({
    initialValues: { name: '',  age: 0 ,gender: '',phone:''},

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      
      age: (value) => (value < 0 ? 'You must be at least 18 to register' : null),
      gender:(value)=>(value.trim().length === 0 ?"please select the gender":null),
      phone:(value)=>(value.length===0 ? null:'phone number must be 10 numbers')
    },
  });

  const MobileNumber = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      if (value === "" || /^[6-9]/.test(value)) {
        form.setFieldValue("phone", value);
      }
    }
  };

  const Editform = useForm({
    initialValues: { name: '',  age: '' ,gender: '',phone:''},

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      
      age: (value) => (value < 0 ? 'You must be at least 18 to register' : null),
      gender:(value)=>(value.trim().length === 0 ?"please select the gender":null),
      phone:(value)=>(value.length===0 ? null:'phone number must be 10 numbers')
    },
  });

 


  useEffect(()=>{GetAll()},[])

  const [data,setdata]=useState([])
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);


  const [opened, { open, close }] = useDisclosure(false);

  const GetAll =async ()=>{
    let res= await api.get('/All_Persons')
    console.log(res.data)
    setdata(res.data)
  }

  const AddPerson = async (e)=>{
    e.preventDefault();
    try{
    let Post= await api.post('/Add',
      {
        name:form.values.name,
        age:form.values.age,
        gender:form.values.gender,
        phone:form.values.phone,
    },{
      header:{'Content-Type':'application/json'}
    })
    console.log(Post.data)
    closeModal()
    form.reset()
    GetAll()
  }
  catch(error){
    console.log('Error',error)
  }
  }

  const EditPerson = async (e)=>{
    e.preventDefault();
    try{
    const id=localStorage.getItem('id')
    let Edit = await api.put(`/edit/${id}`,{
      name:Editform.values.name,
      age:Editform.values.age,
      gender:Editform.values.gender,
      phone:Editform.values.phone,
    }
      ,{
      header:{'Content-Type':'application/json'}
    })
    console.log(Edit.data)
    close()
    Editform.reset()
    GetAll()
  }
  catch(error){
    console.log('error',error)
  }
}

const DELETE = async (id)=>{
  try{
  let Delete = await api.delete(`/delete/${id}`,{
    header:{'Content-Type':'application/json'}
  })
  console.log(Delete.data)
  GetAll()
}
catch(error){
  console.log('error',error)
}
}
 const [details,SetDetails]=useState({})

 const Details = (about)=>{
  console.log(about)
  SetDetails(about)

 }
  const filterData=data
  return (
    <div style={{padding:'50px 30px'}}>
    
      <Card shadow="sm" padding="lg" radius="md" withBorder width='auto'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <h2>Persons Table</h2>
                  <Modal opened={activeModal === 'modal1'} onClose={closeModal} title="Add New Patient">
                    <Card shadow="sm" padding="lg" radius="md" withBorder width='auto'>
                      <form onSubmit={AddPerson}>
                        <TextInput
                        label='Name'
                        placeholder='Name'
                        {...form.getInputProps('name')}
                        />
                        <TextInput
                        label='Age'
                        placeholder='age'
                        {...form.getInputProps('age')}
                        mt='md'
                        />
                        <Select
                        label='Gender'
                        mt='md'
                        placeholder="Select"
                          data={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                            { value: 'Others', label: 'Others' },
                          ]}
                        {...form.getInputProps('gender')}
                        />
                       <TextInput
                        label="Phone Number"
                        placeholder="xxxxxxxxxx"
                        {...form.getInputProps("phone")}
                        onChange={MobileNumber}
                        mt='md'
                      />
                      <Button type='submit' mt='lg' fullWidth>Add</Button>
                      </form>
                    </Card>
                  </Modal>

                  <Group position="center">
                    <Button color='violet' variant="filled"   onClick={() => openModal('modal1')}>Add New Person</Button>
                  </Group>
        </div>
        <Table striped withBorder withColumnBorders>
        <thead>
          <tr style={{backgroundColor:'mediumslateblue'}}>
            <th style={{color:'aliceblue'}}>Id</th>
            <th style={{color:'aliceblue'}}>Name</th>
            <th style={{color:'aliceblue'}}>Age</th>
            <th style={{color:'aliceblue'}}>Gender</th>
            <th style={{color:'aliceblue'}}>Phone</th>
            <th style={{color:'aliceblue'}}>View</th>
            <th style={{color:'aliceblue'}}>Edit</th>
            <th style={{color:'aliceblue'}}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            filterData.map((p,index)=><tr key={index} style={{cursor:'pointer'}}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.phone}</td>
              <td> 
                <Modal opened={activeModal === 'modal2'} onClose={closeModal} title="Selected Person">
                <Card shadow="sm" padding="lg" radius="md" withBorder width='auto'>
                <Avatar color="blue" radius="sm"/>
                <h2>Id:{details.id}</h2>
                <h2>Name:{details.name}</h2>
                <h2>Age:{details.age}</h2>
                <h2>Gender:{details.gender}</h2>
                <h2> Phone:{details.phone}</h2>
                </Card>
                </Modal>

                  <Group position="center">
                    <Button color='green' variant="light"  size="xs" 
                     onClick={() => {openModal('modal2')
                     Details(p)
                     }} leftIcon={<FaRegEye />}>
                      VIEW</Button>
                  </Group>
             </td>
              <td>
              <Modal Modal opened={opened} onClose={close} title="Edit Person">
              <Card shadow="sm" padding="lg" radius="md" withBorder width='auto'>
                      <form onSubmit={EditPerson}>
                        <TextInput
                        label='Name'
                        placeholder='Name'
                        {...Editform.getInputProps('name')}
                        />
                        <TextInput
                        label='Age'
                        placeholder='age'
                        {...Editform.getInputProps('age')}
                        mt='md'
                        />
                        <Select
                        label='Gender'
                        mt='md'
                        placeholder="Select"
                          data={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                            { value: 'Others', label: 'Others' },
                          ]}
                        {...Editform.getInputProps('gender')}
                        />
                       <TextInput
                        label="Phone Number"
                        placeholder="xxxxxxxxxx"
                        {...Editform.getInputProps("phone")}
                        onChange={MobileNumber}
                        mt='md'
                      />
                      <Button type='submit' mt='lg' fullWidth>Save</Button>
                      </form>
                    </Card>
                    
                  </Modal>

                  <Group position="center">
                    <Button color='violet' variant="light"  size="xs" onClick={()=>{
                      localStorage.setItem('id',p.id)
                      Editform.setValues({name:p.name})
                      Editform.setValues({age:p.age})
                      Editform.setValues({gender:p.gender})
                      Editform.setValues({phone:p.phone})
                      open()
                      }} leftIcon={<FaUserEdit />}>EDIT</Button>
                  </Group>
              </td>
              <td>
                    <Button color='red' variant="light"  size="xs"
                    onClick={()=>{
                      DELETE(p.id)
                    }} leftIcon={<MdDeleteForever />}
                    >DELETE</Button>   
              </td>
            </tr>)
          }
        </tbody>
        </Table>
      </Card>
    </div>
  )
}

export default Basic_Crud
