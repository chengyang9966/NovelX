export const ColorPlatter= ()=>{
        const Color=[
            {
                name:'yellow',
                code:'yellow'
            },
            {
                name:'blue',
                code:'blue'
            },
        ]
    
    return(
        <div>
            {
                Color.map(w=>{  
                    return(
                        <div style={{borderRadius:'100',width:'20px',height:'20px'}}>
                            {w.code}
                        </div>
                    )
                })
            }
        </div>
    )
}