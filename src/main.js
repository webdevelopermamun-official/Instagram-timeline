// get form  data
const creact_post_form = document.getElementById('creact_post_form');
const msg = document.querySelector('.msg');
const user_latest_post_list = document.querySelector('.user_latest_post_list');


// show post

const showLatestPost = () => {
    const posts = getDataLS('post');

    let content = '';
    if(posts.length > 0){
        posts.reverse().map((item, index) => {
            content += `
                <div class="post-container">
                <div class="post-header">
                    <div class="author">
                        <div class="author-profile-img">
                            <img src="${item.author_photo}" alt="">
                        </div>
                        <div class="post-author-name">
                            <a href="#">${item.author_name}</a>
                            <span><i class="fas fa-circle"></i> ${timeAgo(item.post_time)}</span>
                            <a href="#"></a>
                            <p>Costa Titch, Champuru Makhenzo</p>
                        </div>
                    </div>
                    <div class="three-dot">
                        <a href="#"><i class="fas fa-ellipsis-h"></i></a>
                    </div>
                </div>

                <div class="post-body">
                    <div class="post-img">
                        ${item.post_photo ? `<img class='w-100 h-75 object-fit-cover' src="${item.post_photo}"/>` : ''}
                    </div>
                    <div class="post-reaction">
                        <div class="p-reaction-left">
                            <div class="post-like post-icon">
                                <span><i class="far fa-heart"></i></span>
                            </div>
                            <div class="post-comment post-icon">
                                <span><i class="far fa-comment"></i></span>
                            </div>
                            <div class="post-share post-icon">
                                <span><i class="far fa-paper-plane"></i></span>
                            </div>
                        </div>
                        <div class="post-save post-icon">
                            <span><i class="far fa-bookmark"></i></span>
                        </div>
                    </div>
                    <div class="post-like-total">
                        <p>5,691,354 likes</p>
                    </div>
                    <div class="post-content">
                        <p> ${item.post_content ? item.post_content : ''}</p>
                    </div>
                    <div class="write-comment">
                        <p>View all 204 comments</p>
                        <form action="#">
                            <input type="text" name="" id="" placeholder="Add a comment…">
                        </form>
                        <span><i class="far fa-smile"></i></span>
                    </div>
                </div>    
                
            </div>




            `;
        })

    }else{
        content = `<h2>No post found</h2>`;      
    }

    user_latest_post_list.innerHTML = content;
};

showLatestPost();

// form submit
creact_post_form.onsubmit = (event) => {
    event.preventDefault();


    // get form data
    const form_data = new FormData(event.target);
    const data = Object.fromEntries(form_data);

    // post form validation
    if(!data.author_name || !data.author_photo || !data.post_content && !data.post_photo){
        msg.innerHTML = setAler('Author name Photo requred post content or photo requred');
    }else{
        msg.innerHTML = '';

        // get previous data
        const pevData = getDataLS("post");
        
        pevData.push({
            author_name : data.author_name,
            author_photo : data.author_photo,
            post_content : data.post_content ?? null,
            post_photo : data.post_photo ?? null,
            post_time : Date.now(),
        })

        // send data to ls
        sendDataLS("post", pevData);

        event.target.reset();
    }

    showLatestPost();
    
    
};