function doPost(request){

  // get the string value of the POST data
  var postJSON = request.postData.getDataAsString();
  var payload = JSON.parse(postJSON);
  var tag = payload.push_data.tag;
  var reponame = payload.repository.repo_name;
  var dockerimagename = payload.repository.name;

  if(typeof request !== 'undefined')

  MailApp.sendEmail({
    to: "pjoginipelly@spartaglobal.com",
    subject: "New Docker Image Uploaded to the repository "+reponame,
    htmlBody: "Hi Team,<br>"+
    "Please find the details of the Docker Image uploaded to the repository "+reponame+ "<br>"+
    "<strong>Docker Name: " + dockerimagename+"<br>"+
    "Docker Image version:" +tag+"<br></strong>"
    });

}