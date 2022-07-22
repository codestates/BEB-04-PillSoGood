import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react"
import SessionStorage from "../../utils/sessionStorage"
import { useRouter } from "next/router"
import axios from "axios"
import { PageTitle } from "../../components/PageTitle"
import React from "react";

const GET_ITEM = gql`
    query GetItem($jwt: String, $id: String) {
        getItem(jwt: $jwt, _id: $id) {
            _id
            name
            type
            imagePath
    }
}
`
const UPDATE_ITEM = gql`
    mutation UpdateItem($jwt: String!, $id: String!, $type: Int!, $name: String!, $imagePath: String!) {
        updateItem(jwt: $jwt, _id: $id, type: $type, name: $name, imagePath: $imagePath)
    }
`;

const DELETE_ITEM = gql`
    mutation DeleteItem($jwt: String!, $id: String!) {
        deleteItem(jwt: $jwt, _id: $id)
    }
`

export async function getServerSideProps(context:any) {
    const itemId = context.query.param[0]
    return {
      props: {itemId: itemId}
    };
}

const BaseDetail = (props:any) => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [type, setType] = useState(0)
    const [imagePath, setImagePath] = useState('')
    const [id, setId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    var [updateItem, { data, loading, error }] = useMutation(UPDATE_ITEM, {
        onCompleted: (data) => {
            if(data.updateItem === 200) {
                alert("수정되었습니다.")
                window.location.href = "/items"
            }
        },
        onError:(error) => {
            console.log(error)
        }
    })

    var [deleteItem, { data, loading, error }] = useMutation(DELETE_ITEM, {
        onCompleted: (data) => {
            if(data.deleteItem === 200) {
                alert("삭제되었습니다.")
                window.location.href = "/items"
            }
        },
        onError:(error) => {
            console.log(error)
        }
    })

    const onUpdateSubmit = (e: any) => {
        if(!confirm("수정하시겠습니까?")) return
        e.preventDefault();
        updateItem({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                id:id,
                name:name,
                imagePath:imagePath,
                type:type
            }
        })
    };

    const onDeleteSubmit = (e: any) => {
        if(!confirm("삭제하시겠습니까?")) return
        e.preventDefault();
        deleteItem({
            variables: {
                jwt: SessionStorage.getItem("jwt"),
                id:id
            }
        })
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

    const saveFileImage = (e:any) => {
        setImagePath(URL.createObjectURL(e.target.files[0]));
      };

    var { loading, data } = useQuery(
        GET_ITEM,
        { variables: { jwt: SessionStorage.getItem("jwt"), id:props.itemId } }
    );

    useEffect(() => {
        if(data !== undefined){
            setName(data.getItem.name)
            setType(data.getItem.type)
            setImagePath(data.getItem.imagePath)
            setId(data.getItem._id)
        }
    }, [data])

    if (loading) {
        return (<div>대기중 ...</div>)
    } 
    if(data) {
        return (
            <div>
                <PageTitle title="아이템 상세 정보"/>
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
                            <button type="submit" onClick={(e) => onUpdateSubmit(e)}>수정</button>
                            <button type="button" onClick={(e) => onDeleteSubmit(e)}>삭제</button>
                            </>
                    }
                </div>
            </div>
        )
    }
    return (
        <>데이터가 없습니다.</>
    )
}

export default BaseDetail