import { useEffect } from "react";
import { useState } from "react"
import axios from "axios";

const Userdata = () => {


    const [data, setData] = useState([]);



    const fetchData = async () => {

        const result = await axios.get('http://localhost:5000/api/getusers')
        console.log(result)

        setData(result.data.data)
    }

    useEffect(() => {
        fetchData()
    }, [])



    // delete user
    const DeleteUser = async (id) => {

        // alert(id)

        const result = data.filter((val) => { val.id !== id })
        setData(result)

        await axios.delete(`http://localhost:5000/api/delete/${id}`)



    }
    return (
        <div>


            <h1>User data</h1>
            <hr />

            <table border='1' cellSpacing='0' cellPadding="10" width="100%">

                <tr>
                    <th>Sr No</th>
                    <th>Profile Id</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>User Pass</th>
                </tr>
                {


                    data.map((val, index) => {

                        return (
                            <>


                                <tr>

                                    <td>{index + 1}</td>
                                    <td>{val.profile_id}</td>
                                    <td>{val.username}</td>
                                    <td>{val.useremail}</td>
                                    <td>{val.userpass}</td>
                                    <td onClick={() => { if (window.confirm('Are You Sure ? ')) { DeleteUser(val.profile_id) } }}><button>Delete</button> </td>
                                </tr>

                            </>
                        )
                    })

                }
            </table>

        </div>
    )
}

export default Userdata
