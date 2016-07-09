import xss from "xss-filters";

let ui = {
  renderPosts(posts){
    let target = document.querySelector(".container");

    let postElements = posts.map( post => {
      return articleElement(post.title, post.lastReply, post.content);
    });

    target.innerHTML = postElements.join("");
  },

  renderActiveUsers(users){

    let target = document.querySelector(".sidebar-content");

    let elements = users.map( (user) => {
      let { name, avatar } = user;
      return activeUsersTemplate(name, avatar);
    });

    target.innerHTML = elements.join("");
  }
};

function articleElement(title, lastReply, content){
  let safeTitle = xss.inHTMLData(title);
  let safeLastReply = xss.inHTMLData(lastReply);
  let safeContent = xss.inHTMLData(content);

  return`
  <div class="blog-post">
    <h3 class='post-title'>
      ${safeTitle}
      <small>${safeLastReply}</small>
    </h3>
    <img class="thumbnail" src="http://placehold.it/850x350">
    <p>${safeContent}</p>
    <div class="callout">
      <ul class="menu simple">
        <li><a href="#">Author: Mike Mikers</a></li>
        <li><a href="#">Comments: 3</a></li>
      </ul>
    </div>
  </div>
  `;
}

function activeUsersTemplate(name, avatar){

  let safeName = xss.inHTMLData(name);
  let safeAvatar = xss.inHTMLData(avatar);

  let template = `
    <div class="active-avatar">
    <img width="54" src="${safeAvatar}">
    <h4 class="post-author">${safeName}</h4>
    </div>`;

  return template;
}

export default ui;
