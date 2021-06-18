import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "test-task-execution" is now active!');

    let echoCommand = vscode.commands.registerCommand('test-task-execution.execute-echo', async () => {


        vscode.window.showInformationMessage('Fetching existing tasks and executing the task named "echo"');
        var tasks = await vscode.tasks.fetchTasks();
        for (var t of tasks) {
            if (t.name === "echo") {

                vscode.window.showInformationMessage('Running vscode.tasks.executeTask for the task `echo`. The task `echo` should be revealed');
                vscode.tasks.executeTask(t); // KO the task is not revealed
                console.log(t);
                // reveal has the value 'always' and not 1
                /*
                {
                  name: 'echo',
                  source: 1,
                  scope: 1,
                  definition: { type: 'shell' },
                  execution: ShellExecution { shellCommandLine: 'echo Hello', shellOptions: {} },
                  presentationOptions: {
                    echo: true,
                    reveal: 'always',
                    focus: false,
                    panel: 'shared',
                    showReuseMessage: true,
                    clear: false
                  }
                }
                */

                return;
            }
        }
        vscode.window.showInformationMessage('No task named `echo` found. Please create one with the command `Task: Configured tasks ...` > `Configure new Task` > `Others`');
    });
    context.subscriptions.push(echoCommand);


    let execTaskWithRevealAlwaysAsStringCommand = vscode.commands.registerCommand('test-task-execution.execute-task-reveal-as-string', async () => {
        var message = "Executing task with 'presentationOptions: { reveal: 'always' }'.\nThe task should be revealed ... but is not ..."
        vscode.window.showInformationMessage(message);
        var execution = new vscode.ShellExecution("echo \"" + message + "\"", {});
        var task:vscode.Task = {
            name: "presentationOptions: { reveal: 'always' }",
            scope: 1,
            source: 'task',
            definition: { type: 'shell' },
            execution: execution,
            presentationOptions: {
                echo: false,
                reveal: JSON.parse('"always"'), // KO the task is not revealed
                focus: false,
                panel: vscode.TaskPanelKind.New,
            },
            isBackground: false,
            runOptions: {},
            problemMatchers: []
        }
        console.log(task);
        vscode.tasks.executeTask(task);
    });
    context.subscriptions.push(execTaskWithRevealAlwaysAsStringCommand);

    let execTaskWithRevealAlwaysAsEnumCommand = vscode.commands.registerCommand('test-task-execution.execute-task-reveal-as-enum', async () => {
        var message = "Executing task with 'presentationOptions: { reveal: 1 }'.\nThe task should be revealed."
        vscode.window.showInformationMessage(message);
        var execution = new vscode.ShellExecution("echo \"" + message + "\"", {});
        var task:vscode.Task = {
            name: "presentationOptions: { reveal: 1 }",
            scope: 1,
            source: 'task',
            definition: { type: 'shell' },
            execution: execution,
            presentationOptions: {
                echo: false,
                reveal: vscode.TaskRevealKind.Always, //OK the task is revealed
                focus: false,
                panel: vscode.TaskPanelKind.New
            },
            isBackground: false,
            runOptions: {},
            problemMatchers: []
        }
        console.log(task);
        vscode.tasks.executeTask(task);
    });
    context.subscriptions.push(execTaskWithRevealAlwaysAsStringCommand);

}

// this method is called when your extension is deactivated
export function deactivate() { }
