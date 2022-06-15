const nonImpIcon = "far fa-star";
const impIcon = "fas fa-star";
let isImportant = false;

function toggleImportant(){

    if(isImportant){
        $("#iconImportant").removeClass(impIcon).addClass(nonImpIcon);
        $("#textImportant").text("Not Important!");
        isImportant = false;
    }
    else{
        $("#iconImportant").removeClass(nonImpIcon).addClass(impIcon);
        $("#textImportant").text("Important!");
        isImportant = true;
    }
}

function toggleVisible(){
    if($("#taskForm").is(":visible")){
        $("#taskForm").hide();
        $("#hideButton").text("Show");
    }
    else{
        $("#taskForm").show();
        $("#hideButton").text("Hide");
    }
}

function init(){
    $("#iconImportant").click(toggleImportant);
    $("#hideButton").click(toggleVisible);
}
window.onload = init;