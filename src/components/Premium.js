import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import StyledDescription from "../styles/StyleDescription";
import StyledTitle from "../styles/StyledTitle";
import image from "../imgs/image03.jpg"
import StyledButton from "../styles/StyledButton";

export default function Premium(){
    const {login, choosenPlan, setChoosenPlan} = useContext(UserContext);
    const navigate=useNavigate();
    const [isPlanOpen, setIsPlanOpen]=useState("open")
    const [isDeliveryOpen, setIsDeliveryOpen]=useState("closed")
    const [isProductsOpen, setIsProductsOpen]=useState("closed")
    const [monday, setMonday]= useState("")
    const [wednesday, setWednesday]= useState("")
    const [friday, setFriday]= useState("")
    const [tea, setTea]= useState("")
    const [incense, setIncense]= useState("")
    const [organicProduct, setOrganicProduct]=useState("")

    useEffect(()=>{
        if(!login) navigate("/")
        else if(login.user.planId) navigate("/plan");
    },[login,navigate])

    function subscribe(){
        let body = {};
        body.type=choosenPlan;
        if(choosenPlan==='week' && monday==="checked") body.weekday="monday"
        else if(choosenPlan==='week' && wednesday==="checked") body.weekday="wednesday"
        else if(choosenPlan==='week' && friday==="checked") body.weekday="friday"
        else if(choosenPlan==='month' && monday==="checked") body.monthday="dayOne"
        else if(choosenPlan==='month' && wednesday==="checked") body.monthday="dayTen"
        else if(choosenPlan==='month' && friday==="checked") body.monthday="dayTwenty"
        else return alert("Escolha o dia da entrega")
        tea === "checked" ? body.tea=true : body.tea=false
        incense === "checked" ? body.incense=true : body.incense=false
        organicProduct === "checked" ? body.organicProduct=true : body.organicProduct=false
        if(body.organicProduct === false && body.incense===false && body.tea===false) return alert("Escolha o item que deseja receber")
        console.log(body)
    }

    return (
        <>
            {login ?
            <>
                <StyledTitle> Bom te ver por aqui, {login.user.name}. </StyledTitle>
                <StyledDescription>
                    “Agradecer é arte de atrair coisas boas”
                </StyledDescription>
                <StyledCard>
                    <img src={image} alt=""/>
                    {isPlanOpen === 'open' ? 
                        <div className="open">
                            <span onClick={()=> setIsPlanOpen("closed")}>Plano</span>
                                {choosenPlan === 'month' ?
                                    <div>
                                        <div>
                                            <input type="radio" name="plan" id="month" checked="checked"/>
                                            <label for="month">Plano Mensal</label>
                                        </div>
                                        <div onClick={()=> setChoosenPlan('week')}>
                                            <input type="radio" name="plan" id="week"/>
                                            <label for="week">Plano Semanal</label>
                                        </div>
                                    </div>
                                :
                                    <div>
                                        <div onClick={()=> setChoosenPlan('month')}>
                                            <input type="radio" name="plan" id="month"/>
                                            <label for="month">Plano Mensal</label>
                                        </div>
                                        <div >
                                            <input type="radio" name="plan" id="week" checked="checked"/>
                                            <label for="week">Plano Semanal</label>
                                        </div>
                                    </div>

                                }
                        </div>
                    :
                        <div className="closed" onClick={()=> setIsPlanOpen("open")}>
                            <span>Plano</span>
                        </div>
                    }
                    {isDeliveryOpen === 'open' ? 
                        <div className="open">
                            <span onClick={()=> setIsDeliveryOpen("closed")}>Entrega</span>
                            {choosenPlan==="week" ?
                                <div>
                                    <div>
                                        <input type="checkbox" 
                                        name="delivery" 
                                        id="monday" 
                                        checked={monday}
                                        onChange={e=>{
                                            setMonday("checked")
                                            setWednesday("")
                                            setFriday("")
                                            }
                                        }
                                    />
                                        <label for="monday">Segunda-feira</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" 
                                        name="delivery" 
                                        id="wednesday" 
                                        checked={wednesday}
                                        onChange={e=>{
                                            setMonday("")
                                            setWednesday("checked")
                                            setFriday("")
                                            }
                                        }
                                    />
                                        <label for="wednesday">Quarta-feira</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" 
                                            name="delivery" 
                                            id="friday"
                                            checked={friday}
                                            onChange={e=>{
                                                setMonday("")
                                                setWednesday("")
                                                setFriday("checked")
                                                }
                                            }
                                    />
                                        <label for="friday">Sexta-feira</label>
                                    </div>
                                </div>
                            :
                            <div>
                                <div>
                                    <input type="checkbox" 
                                    name="delivery" 
                                    id="dayOne" 
                                    checked={monday}
                                    onChange={e=>{
                                        setMonday("checked")
                                        setWednesday("")
                                        setFriday("")
                                        }
                                    }
                                />
                                    <label for="dayOne">Dia 01</label>
                                </div>
                                <div>
                                    <input type="checkbox" 
                                    name="delivery" 
                                    id="dayTen" 
                                    checked={wednesday}
                                    onChange={e=>{
                                        setMonday("")
                                        setWednesday("checked")
                                        setFriday("")
                                        }
                                    }
                                />
                                    <label for="dayTen">Dia 10</label>
                                </div>
                                <div>
                                    <input type="checkbox" 
                                        name="delivery" 
                                        id="dayTwenty"
                                        checked={friday}
                                        onChange={e=>{
                                            setMonday("")
                                            setWednesday("")
                                            setFriday("checked")
                                            }
                                        }
                                />
                                    <label for="dayTwenty">Dia 20</label>
                                </div>
                            </div>
                            }
                            
                        </div>
                    :
                        <div className="closed" onClick={()=> setIsDeliveryOpen("open")}>
                            <span>Entrega</span>
                        </div>
                    }
                    {isProductsOpen === 'open' ? 
                        <div className="open" >
                            <span onClick={()=> setIsProductsOpen("closed")}>Quero Receber</span>
                            <div>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        name="products" 
                                        id="tea"
                                        checked={tea}
                                        onChange={e=>{
                                            tea === 'checked' ? setTea("") : setTea("checked")
                                            }
                                        }
                                    />
                                    <label for="tea">Chás</label>
                                </div>
                                <div>
                                <input 
                                        type="checkbox" 
                                        name="products" 
                                        id="incense"
                                        checked={incense}
                                        onChange={e=>{
                                            incense === 'checked' ? setIncense("") : setIncense("checked")
                                            }
                                        }
                                    />
                                    <label for="incense">Incensos</label>
                                </div>
                                <div>
                                <input 
                                        type="checkbox" 
                                        name="products" 
                                        id="organicProduct"
                                        checked={organicProduct}
                                        onChange={e=>{
                                            organicProduct === 'checked' ? setOrganicProduct("") : setOrganicProduct("checked")
                                            }
                                        }
                                    />
                                    <label for="organicProduct">Produtos Orgânicos</label>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="closed" onClick={()=> setIsProductsOpen("open")}>
                            <span>Quero Receber</span>
                        </div>
                    }
                </StyledCard>
                <StyledButton onClick={subscribe}>Próximo</StyledButton>
            </>
            :
                <p>Carregando...</p>
            }
        </>
    )
}

const StyledCard = styled.div`
    width: 358px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 350px;
    justify-content: space-between;
    border-radius: 15px;

    & img{
        width: 100%;
        height: 175px;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }

    & .closed{
        width: 290px;
        height: 44px;
        background-color:  #E0D1ED9E;
        color:#4d65A8;
        font-size: 18px;
        font-weight: 700;
        box-sizing:border-box;
        padding: 10px;
        margin: 13px;
        border-radius: 5 px;
    }
    & .open{
        width: 290px;
        height: 110px;
        background-color:  #E0D1ED9E;
        color:#4d65A8;
        box-sizing:border-box;
        padding: 10px;
        margin: 13px;
        display: flex;
        flex-direction: column;
        border-radius: 5px;

        & label{
            font-size: 17px;
        }

        & div{
            display: flex;
            flex-wrap: wrap;

            & div{
                margin: 10px;
            }
        }

        & span{
            font-size: 18px;
            font-weight: 700;
        }
    }
`;