import type { NextPage } from 'next'
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router"
import SessionStorage from "../../utils/sessionStorage"
import { useState } from "react"
import axios from "axios"

const CREATE_ITEM = gql`
    mutation CreateItem($jwt: String!, $type: Int!, $name: String!, $imagePath: String!) {
        createItem(jwt: $jwt, type: $type, name: $name, imagePath: $imagePath)
    }
`

const NewItem: NextPage = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [type, setType] = useState(0)
    const [imagePath, setImagePath] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    var [createItem, { data, loading, error }] = useMutation(CREATE_ITEM, {
        onCompleted: (data) => {
            if(data.createItem === 200) {
                alert("등록되었습니다.")
                window.location.href = "/items"
            }
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const saveFileImage = (e:any) => {
        setImagePath(URL.createObjectURL(e.target.files[0]));
      };
    const sendFileToIPFS = async (f: any) => {
        setIsLoading(true)
        if (f) {
          const formData = new FormData();
          formData.append("file", f);
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              "pinata_api_key": `${process.env.PINATA_API_KEY}`,
              "pinata_secret_api_key": `${process.env.PINATA_API_SECRET_KEY}`,
              "Content-Type": "multipart/form-data"
            },
          });
          const imageHash = `https://ipfs.moralis.io:2053/ipfs/${resFile.data.IpfsHash}`;
          setImagePath(imageHash);
          setIsLoading(false)
        }
      };
    const onSubmit = (e: any) => {
        if(!confirm("등록하시겠습니까?")) return
        e.preventDefault();
        createItem({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                name:name,
                imagePath:imagePath,
                type:type
            }
        })
    };
    return (
        <div>
                <h1>새 아이템 등록</h1>
                <div>
                    <label>이름</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>타입</label>
                    <input type="number" value={type} onChange={(e) => setType(parseInt(e.target.value))}/>
                </div>
                <div>
                    <input type="file" onChange={(e) => {
                            saveFileImage(e)
                            sendFileToIPFS(e.target.files[0])
                        }
                    }/>
                </div>
                <div>
                    <img src={imagePath} alt=""/>
                </div>
                <div>
                    {
                        isLoading? 
                            <div>대기중...</div>:
                            <>
                            <button onClick={() => router.back()}>목록으로</button>
                            <button type="submit" onClick={(e) => onSubmit(e)}>등록</button>
                            </>
                    }
                </div>
            </div>
    )
}

export default NewItem
