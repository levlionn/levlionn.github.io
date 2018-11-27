var vm = new Vue({

    el: "#root",
    data: {
        mode: "home",
        outcomes: content,
        currentOutcome_id: 0
    },
    computed: {
       
        currentOutcome: function(){
            var _this = this;
            return this.outcomes.find(function(outcome){
                return outcome.id === _this.currentOutcome_id;
            });
        }
    },
    methods: {
        viewOutcome: function(id){
            this.mode = "outcomes";
            this.currentOutcome_id = id;
            document.title = `${this.currentOutcome.name}`;
        },
        viewHome: function()
        {
            this.mode = "home";
            document.title = "Home";

        }
    }
});

