   // find post edit form
   let postEditform = document.getElementById('postEditform');

   // add submit listener to post edit form
   postEditform.addEventListener('submit', function(event){
       
       //find length of upload images
       let imageUploads = document.getElementById('imageUpload').files.length;
   
       //find total number of exiting images
       let existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length;
   
       // Find total number of pontential deletions
       let imgDeleteions = document.querySelectorAll('.imageDeleteCheckbox:checked').length;

       //figure out if the form can be submitted or not
       let newTotal = existingImgs - imgDeleteions + imageUploads;
       debugger
       if(newTotal > 4){
           event.preventDefault();
           let removalAmt = newTotal - 4;
           alert(`You need to remove at least ${removalAmt} image${removalAmt === 1 ? '' : 's'}!!`)
       }
   });


