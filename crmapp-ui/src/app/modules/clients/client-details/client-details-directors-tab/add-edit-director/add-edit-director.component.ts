import {Component, OnInit} from '@angular/core';
import {ClientDirector} from "app/models/ClientDirector";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "app/services/client.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {UtilService} from "app/services/util.service";
import {PostService} from "app/services/post.service";
import {Post} from "app/models/Post";
import {Client} from "app/models/Client";

@Component({
    selector: 'app-add-edit-director',
    templateUrl: './add-edit-director.component.html',
    styleUrls: ['./add-edit-director.component.css']
})
export class AddEditDirectorComponent implements OnInit {
    director: ClientDirector;
    posts: Post[];
    isNew: boolean = false;
    years: string;
    ru: any;
    directorForm: FormGroup;
    loadingState: boolean;

    constructor(private clientService: ClientService,
                private postService: PostService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.initDirectorForm();
        this.getPosts();
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    ngOnInit() {
        let directorId = +this.route.snapshot.params.id;
        if (directorId) {
            this.loadingState = true;
            this.clientService.getDirectorById(directorId, this.getClient().id).toPromise()
                .then(response => {
                    this.director = response;
                    this.directorForm.controls.fullName.setValue(response.fullName);
                    this.directorForm.controls.shortName.setValue(response.shortName);
                    this.directorForm.controls.post.setValue(response.post);
                    this.directorForm.controls.dateStart.setValue(new Date(response.dateStart));
                    this.loadingState = false;
                });
        } else {
            this.isNew = true;
        }
    }

    onSubmit() {
        if (this.isNew) {
            this.save();
        } else {
            this.update();
        }
    }

    private initDirectorForm() {
        this.directorForm = this.formBuilder.group({
            fullName: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])],
            shortName: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])],
            post: ['', Validators.compose([
                Validators.required,
                Validators.nullValidator
            ])],
            dateStart: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])]
        });
    }

    getClient() {
        let client: Client = new Client();
        this.clientService.getCurrentClient().subscribe(data => client = data);
        return client;
    }

    getPosts() {
        this.postService.getPosts().toPromise()
            .then(posts => {
                this.posts = posts;
            });
    }

    private save() {
        let msg = 'Директор для ' + this.getClient().code;
        let director: ClientDirector = new ClientDirector();
        director.fullName = this.directorForm.controls.fullName.value;
        director.shortName = this.directorForm.controls.shortName.value;
        director.post = this.directorForm.controls.post.value;
        director.dateStart = this.directorForm.controls.dateStart.value;
        this.clientService.addDirector(director, this.getClient().id).toPromise()
            .then(response => {
                this.clientService.fetchDirectorsByClientId(this.getClient().id).toPromise()
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно добавлен (ID=' + response.id + ')'
                        });
                    })
                    .then(() => {
                        this.goBackToDirectors();
                    });
            })
    }

    private goBackToDirectors() {
        this.clientService.goToUrl([this.getClient().url, 'directors'])
            .then(() => {
            });
    }

    confirmDeleting() {
        this.confirmationService.confirm({
            message: 'Действительно удалить директора?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                let msg = 'Адрес (ID=' + this.director.id + ')';
                this.clientService.deleteDirector(this.director.id, this.getClient().id).toPromise()
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно удален'
                        });
                    })
                    .then(() => {
                        this.clientService.fetchDirectorsByClientId(this.getClient().id).toPromise()
                            .then(() => {
                                this.goBackToDirectors();
                            })
                    })
            },
            reject: () => {
            }
        });
    }

    private update() {
        const director = {
            id: this.director.id,
            fullName: this.directorForm.controls.fullName.value,
            shortName: this.directorForm.controls.shortName.value,
            post: this.directorForm.controls.post.value,
            dateStart: this.directorForm.controls.dateStart.value,
        };
        this.clientService.updateDirector(director, this.getClient().id).toPromise()
            .then(response => {
                let msg = 'Директор (ID=' + response.id + ') для клиента ' + this.getClient().code;
                this.clientService.fetchDirectorsByClientId(this.getClient().id).toPromise()
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно обновлен'
                        });
                    })
                    .then(() => {
                        this.goBackToDirectors();
                    })
            });
    }

}
