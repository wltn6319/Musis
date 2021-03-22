import Board from "../models/board";


//게시판 글 목록
export const getlist = async(req, res) => {
     const { page } = req.query;
     let token = req.cookies.token   //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )

     try{  
     const totalPost = await Board.countDocuments({});  // db에 존재하는 모든 게시물의 총개수 가져옴
     if(!totalPost) {
        throw Error();
     }
    
     let {
         startPage, //시작 페이지
         endPage, // 화면에 보여줄 마지막 페이지 번호
         maxPost, // 페이지당 최대 게시물
         hidePost, // find().limit을 위한 변수 앞에 find한 데이터를 제외하고 그 다음 데이터를 불러오기 위함
         totalPage, // 총 페이지
         currentPage // 현재 위치한 페이지
     } = paging(page, totalPost);
     const boards = await Board.find({}).limit(maxPost).skip(hidePost).sort({_id : -1}); 
     res.render("board/list", {
         user : token, // 로그인 판변을 위함
         boards,
         currentPage,
         startPage,
         endPage,
         totalPage,
         totalPost,
         maxPost
     });
    }catch (error){
        res.render("board/list" , {user : token, boards: [], startPage : 1, endPage:1}); //디비에 데이터가 없을시 
    }
}

//paging 함수
const paging = (page, totalPost) =>{
    const maxPost = 8; // 화면에 보여질 최대 게시물 수
    const maxPage = 5; // 화면에 보여질 최대 페이지 수
    let currentPage = page ? parseInt(page) : 1; // 쿼리스트링으로 받아와서 parseInt메서드 사용
    const hidePost = page === 1 ? 0 : (page - 1) * maxPost;
    const totalPage = Math.ceil(totalPost / maxPost);

    if(currentPage > totalPage) { // 현재 페이지가 총 페이지 보다 클 경우 현재페이지가 마지막 페이지가 되게함
        currentPage = totalPage;
    }

    const startPage = Math.floor(((currentPage - 1) / maxPage)) *maxPage +1;//시작 페이지 작성 ex) 1 2..5  / 6 7 ..10 
    let endPage = startPage + maxPage -1; //화면에 표시할 페이지의 마지막 번호

    // ex) totalPage 개수가 36개일때 startPage는 31 이고 endPage는 40이니깐 이것을 방지하기 위해 치환
    if(endPage > totalPage){
        endPage = totalPage;
    }

    return { startPage, endPage, maxPost, hidePost, totalPage, currentPage};
}




//게시판 글 올리기 get방식
export const boardCreate = (req,res) =>{
    let token = req.cookies.token; //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
    let decode = req.user;
    res.render("board/boardCreate.ejs", {
        user : token,
        decode : decode
    });
}

//게시판 글 올리기 post 방식
export const board_create_summit = (req, res)=>{
   
    console.log("board_Create_summit 들어옴");
    const userID = req.user.id;  //decode 안에 있는 유저 id 
    const content = req.body.content;
    const title = req.body.title;

    const newBoard = new Board({
        userID: userID,
        content: content,
        title: title,
    })
    newBoard.save((err, newBoard) => {
        if(err) return console.log(err);
    })
    res.redirect("/board/list");    
}

//작성한 게시물 보기
export const boardDetail = async(req, res)=>{

        let token = req.cookies.token //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
        let decode = req.user;
        let boards = await Board.findOne( { _id :  req.params.id }).exec();   
            res.render('board/boardDetail',{
               boards: boards,
               user : token,
               decode
            });   
    }


//게시물 업데이트 화면 get방식
export const boardUpdate = async(req,res) =>{
    let token = req.cookies.token //로그인이 되어있는지 판별 (로그인시 상단에 <로그아웃 프로필> 표시 안되있을시 <로그인? 표시 )
    let decode = req.user;

    let boards = await Board.findOne({_id : req.params.id}).exec();
    if(decode.id === boards.userID){
    res.render("board/boardUpdate", {
        boards: boards,
        user : token,
        decode: decode
    })
} else {
    
    res.redirect("/board/boardUpdate");
}
}

//게시물 업데이트 post 방식
export const boardUpdate_summit = async(req,res) =>{

    const update = {
        content : req.body.content,
        title : req.body.title
    }
    
    Board.updateOne({_id: req.params.id}, {$set: update}, (err)=>{
        if(err){ res.send("error");}
        
        res.redirect("/board/boardDetail/" + req.params.id);
    })

}


//게시판 삭제
export const boardDelete = async(req,res) =>{

    let decode = req.user;
   let board = await Board.findOne({_id: req.params.id}).exec();

   if(decode.id === board.userID){
    board.remove((err)=>{
        if(err){
            res.status(500).send("delete error");
            return;
        }
        res.redirect("/board/list");
    });
}
    else{
        res.redirect("/board/list");
    }
}
 