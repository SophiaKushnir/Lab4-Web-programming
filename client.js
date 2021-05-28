$(document).ready(function(){
    function getUsers(){
        $.get('/getusers',function(data){
            createTable('#table',data)
        })
    }
    function createTable(element,arr){
        $(element).empty();
        console.log(arr);
        $('<table>')
            .addClass("table table-bordered table-primary col-6")
            .appendTo(element)
            .addClass("td")
        $('<tr>').appendTo('table').addClass("tdt");
        $('<td>').appendTo('tr:last').text("Name").addClass("tdt");
        $('<td>').appendTo('tr:last').text("Age").addClass("tdt");
        $('<td>').appendTo('tr:last').text("Password").addClass("tdt");
        $('<td>').appendTo('tr:last').text("Group").addClass("tdt");
        $('<td>').appendTo('tr:last').text("").addClass("tdt");
        $('<td>').appendTo('tr:last').text("").addClass("tdt");
        var ourtable = JSON.parse(JSON.stringify(arr));
        for(var i=0; i < ourtable.length; i++){
            $('<tr>').appendTo('table').addClass("tr");
            for(var key in ourtable[i]){
                $('<td>').appendTo('tr:last').text(ourtable[i][key]).addClass("td");
            }
            $('tr:last td:first').hide();
            $('<td>').appendTo('tr:last').addClass("td");
            var h =0;
            $('<button>').text('Update').addClass('btn btn-primary')
                .appendTo('td:last').click(function(){
                h++;
                var idt=$(this).parent().parent().find("td:first").text();
                var namet=$(this).parent().parent().find("td:eq(1)").text();
                var aget=$(this).parent().parent().find("td:eq(2)").text();
                var passt=$(this).parent().parent().find("td:eq(3)").text();
                var grpt=$(this).parent().parent().find("td:eq(4)").text();
                $('.name').val(namet);
                $('.age').val(aget);
                $('.pass').val(passt);
                $('.grp').val(grpt);
                $("#AddButton").hide();
                if(h===1){
                    $('<button>').text('Update').addClass('btn-success update btn-lg btn-block').appendTo('.myform').click(function(){
                        const name=$('.name').val();
                        const age=$('.age').val();
                        const pass=$('.pass').val();
                        const grp=$('.grp').val();
                        $('.name').val("");
                        $('.age').val("");
                        $('.pass').val("");
                        $('.grp').val("");
                        updateUser(idt,name,age,pass,grp);
                        $('.update').hide();
                        $("#AddButton").show();
                    });
                }
                console.log(idt);
            });
            $('<td>').appendTo('tr:last').addClass("td");
            $('<button>').text('Delete').addClass('btn btn-danger')
                .appendTo('td:last').click(function(){
                var id=$(this).parent().parent().find('td:first').text();
                console.log(id);
                deleteUser(id);
            });
        }
    }
    function addUser(name,age,pass,grp){
        if(!name||!age||!pass||!grp) {
            alert('Input all data!');
            return;
        }
        var obj={
            name:name,
            age:age,
            pass:pass,
            grp:grp
        }
        $.post('/adduser',obj,function(data){
            console.log(data);
            getUsers();
        })
    }
    function deleteUser(id){
        var obj={id:id};
        $.post('/deleteuser',obj,function(data){
            console.log(data);
            getUsers();})
    }
    function updateUser(id,name,age,pass,grp){
        if(!name||!age||!pass||!grp) {
            alert('Input all data!');
            return;
        }
        var obj={
            id:id,
            name:name,
            age:age,
            pass:pass,
            grp:grp
        }
        $.post('/updateuser',obj,function(data){
            console.log(data);
            getUsers();
        })
    }
    $('.add').click(function(){
        const name=$('.name').val();
        const age=$('.age').val();
        const pass=$('.pass').val();
        const grp=$('.grp').val();
        $('.name').val("");
        $('.age').val("");
        $('.pass').val("");
        $('.grp').val("");
        addUser(name,age,pass,grp);
    })
    getUsers();
})
