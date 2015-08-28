
if (Meteor.isClient) {

    Template.ProjectList.helpers({

        projects: function () {
            return Projects.find();
        },

    });

    Template.ProjectList.events({

        'submit form#projectAdd': function (event, template) {
            event.preventDefault();

            var projectName = event.target.projectName.value;

            if (!projectName || projectName == "") {
                return;
            }

            event.target.projectName.value = "";
            Projects.insert({ title: projectName });
        },

    });

}