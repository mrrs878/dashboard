class Dict implements DictI {
  create_time: number;

  id: number;

  label: string;

  label_view: string;

  name: string;

  status: number;

  type: string;

  type_view: string;

  value: number;


  constructor(create_time: number = 0, id: number = 0, label: string = '', label_view: string = '', name: string = '',
    status: number = 0, type: string = '', type_view: string = '', value: number = 0) {
    this.create_time = create_time;
    this.id = id;
    this.label = label;
    this.label_view = label_view;
    this.name = name;
    this.status = status;
    this.type = type;
    this.type_view = type_view;
    this.value = value;
  }
}

export default Dict;
