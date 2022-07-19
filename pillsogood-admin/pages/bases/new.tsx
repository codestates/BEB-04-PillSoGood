import type { NextPage } from 'next'
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router"
import SessionStorage from "../../utils/sessionStorage"
import { useState } from "react"
import axios from "axios"

const CREATE_BASE = gql`
    mutation CreateBase($jwt: String!, $name: String, $imagePath: String, $level: Int) {
        createBase(jwt: $jwt, name: $name, imagePath: $imagePath, level: $level)
    }
`

const NewBase: NextPage = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [level, setLevel] = useState(0)
    const [imagePath, setImagePath] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    var [createBase, { data, loading, error }] = useMutation(CREATE_BASE, {
        onCompleted: (data) => {
            if(data.createBase === 200) {
                alert("등록되었습니다.")
                window.location.href = "/bases"
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
        createBase({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                name:name,
                imagePath:imagePath,
                level:level
            }
        })
    };
    return (
        <div>
                <h1>새 기본 캐릭터 등록</h1>
                <div>
                    <label>이름</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>레벨</label>
                    <input type="number" value={level} onChange={(e) => setLevel(parseInt(e.target.value))}/>
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

export default NewBase
