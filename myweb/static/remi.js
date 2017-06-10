$(function(){
 var colorScalePwCOpacity100 = ['#FFB600', '#D04A02', '#E0301E', '#D93954', '#A32020', '#602320', '#736B53'];
   var keyNode = "";
    var nodeGuid="";
    var currentlyNode={};
    var orangeColor = '#F27A18';
    var currentColor ='#313333';
    var darkgrayColor = '#9d9d9d';
    var lightgrayColor = 'lightgrey';
    var simulation,node,link;
   var objGuids = [];
   var currentSelectNode = [];
   var currentNodeAction = "expandChild";
   var base_data = {
        nodes: [],
        links:[]
    };
    var inputControlsNetwork = {
        'svg': {
            'margins': {
                'marginType': 'percent',
                'top': 0.1,
                'left': 0.05,
                'right': 0.05,
                'bottom': 0.1
            }
        },
        'plotArea': {
            'link': 'curve',
            'test': 0,
            'focal_entity': {
                'filter_value': ''
            },
            'initialScale': {
                'status': 'On',
                'attr': {
                    "transformX": 1.5,
                    "transformY": 1.6,
                    "scale": 4
                },
            },
            'arrow': {
                'status': 'On',
                'attr': {
                    "refX": 33,
                    "refY": 0,
                    "markerWidth": 3,
                    "markerHeight": 3,
                    "orient": "auto"
                },
                'style': {
                    'fill': 'black',
                    'opacity': .8,
                    'z-index': 100
                }
            },
            'labelText': {
                'status': 'On',
                'attr': {
                    "dx": 50,
                    "dy": 0
                },
                'style': {
                    "font-family": "sans-serif",
                    "font-size": 3,
                    "fill": "black"
                }
            },
            'nodeText': {
                'status': 'On',
                'attr': {
                    'dy': '.35em'
                },
                'style': {
                    "font-family": "sans-serif",
                    "font-size": 3,
                    "fill": "black",
                    'opacity': 1
                }
            },
            'location_plot': {
                'height': 1,
                'width': 2
            },
            'location_node': {
                'height': 2,
                'width': 1
            },
            'zoom': {
                'zoom_in': 20,
                'zoom_out': 20
            },
            'alphaTarget': {
                'start': 0.3,
                'end': 0
            },
            'node': {
                'radius': 11
            },
            'link_attr': {
                'stroke': 'lightgrey',
                'stroke-dasharray': 'solid',
                'stroke-width': 5
            },
            'hoverAttr': {
                'font-style': 'italic',
                'font-size': 11,
                'stroke': '#ea8a23',
                'stroke-width': 1,
                'opacity': 0.5
            },
            'enterAttr': {
                'font-family': 'sans-serif',
                'font-style': 'normal',
                'font-size': 9,
                'stroke': 'black',
                'stroke-width': 0.5,
                'opacity': 1
            },
            'color': {
                'colorScaleCategories': [colorScalePwCOpacity100[0], colorScalePwCOpacity100[5]]
                //colorScalePwCOpacity100
            },
            'enterStyles': {
                'cursor': 'pointer'
            },
            'enterTransition': {
                'status': 'On',
                'delay': 400,
                'indexDelay': 80,
                'duration': 2000,
                'amplitude': 1,
                'period': 0.75,
                'easeType': 'easeElasticOut'
            },
            'updateTransition': {
                'delay': 250,
                'duration': 2000
            }
        }
    };

    var dataMapping2 = {
        'quantVar1': {
            'mappedValue': 'trans_amt',
            'aggType': 'min'
        },
        'catVar1': {
            'mappedValue': 'source_uid'
        },
        'catVar2': {
            'mappedValue': 'target_uid'
        },
        'catVar3': {
            'mappedValue': 'match_uid'
        },
        'catVar4': {
            'mappedValue': 'source_type'
        },
        'catVar5': {
            'mappedValue': 'target_type'
        },
        'catVar6': {
            'mappedValue': 'rel_type'
        },
        'sourceName':{
            'mappedValue': 'source_name'
        },
        'targetName':{
            'mappedValue': 'target_name'
        }
    };
// var datasource1 = [{"match_uid":"","source_uid":"9d21d81e-37ef-4ccd-9903-4db9477b1286","source_name":"9d21d81e-37ef-4ccd-9903-4db9477b1286","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","source_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","source_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"dbb3989f-b9ae-433f-a8c2-1a784294e8d0","source_name":"dbb3989f-b9ae-433f-a8c2-1a784294e8d0","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"197f4547-6642-49ac-bc32-56b042579e26","source_name":"197f4547-6642-49ac-bc32-56b042579e26","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"e335224b-6b5d-4fab-b5f3-f7be06b61ad2","source_name":"e335224b-6b5d-4fab-b5f3-f7be06b61ad2","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"87f95950-ceab-4474-b1b2-1e9e66fc2c74","source_name":"87f95950-ceab-4474-b1b2-1e9e66fc2c74","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","source_name":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"ad38b4c6-ef86-4714-b8ec-1d60a0c387d2","source_name":"ad38b4c6-ef86-4714-b8ec-1d60a0c387d2","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"7e91aa69-d6fb-4c22-95fd-efe53876b44c","source_name":"7e91aa69-d6fb-4c22-95fd-efe53876b44c","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"19e82c76-c9c2-4483-b41b-0149167816bc","source_name":"19e82c76-c9c2-4483-b41b-0149167816bc","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"2a444758-6704-4406-9d11-a220b1f65301","source_name":"2a444758-6704-4406-9d11-a220b1f65301","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"6c3af2c7-0d84-4769-9636-d45a96d800e5","source_name":"6c3af2c7-0d84-4769-9636-d45a96d800e5","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"1f702f20-349b-4e29-b0f0-e4edb2bb9f14","source_name":"1f702f20-349b-4e29-b0f0-e4edb2bb9f14","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"544f1080-80d7-4788-b7d0-be0333592cba","source_name":"544f1080-80d7-4788-b7d0-be0333592cba","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"03036b27-e01e-40d3-851c-146a2088a08e","source_name":"03036b27-e01e-40d3-851c-146a2088a08e","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"ff655a74-5d66-4820-b617-6b307e6a37b2","source_name":"ff655a74-5d66-4820-b617-6b307e6a37b2","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"ebd47e6b-c191-48ad-a298-932f678d1d0d","source_name":"ebd47e6b-c191-48ad-a298-932f678d1d0d","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"0da069a9-7c9c-4ec7-8a3d-be7ca53d61ff","source_name":"0da069a9-7c9c-4ec7-8a3d-be7ca53d61ff","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"138e4f82-9160-4410-be9c-27a54b5879c0","source_name":"138e4f82-9160-4410-be9c-27a54b5879c0","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"fbda56f6-8b7a-4c41-a146-58e747f9b668","source_name":"fbda56f6-8b7a-4c41-a146-58e747f9b668","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"b3f20dd9-fc9f-410f-a021-cb9b4b1cc9fe","source_name":"b3f20dd9-fc9f-410f-a021-cb9b4b1cc9fe","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"e6e4446f-8a79-41bd-b88e-cce153b6204c","source_name":"e6e4446f-8a79-41bd-b88e-cce153b6204c","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"b8b74bec-cc87-431f-85f8-46e277944bdc","source_name":"b8b74bec-cc87-431f-85f8-46e277944bdc","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"f19f044e-f9ad-413c-8b21-75231323eb89","source_name":"f19f044e-f9ad-413c-8b21-75231323eb89","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"8bf84646-426d-418e-943c-44bd0cdaba07","source_name":"8bf84646-426d-418e-943c-44bd0cdaba07","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"d545896b-1930-4be7-9cc9-91522e1f5f87","source_name":"d545896b-1930-4be7-9cc9-91522e1f5f87","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"35fe6722-d7d1-450b-a41b-b9493334cd18","source_name":"35fe6722-d7d1-450b-a41b-b9493334cd18","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"0bed052d-203b-48f0-a183-b7eeaf6cd4a4","source_name":"0bed052d-203b-48f0-a183-b7eeaf6cd4a4","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"e057e08c-e354-444b-85c2-7f6ea9444c90","source_name":"e057e08c-e354-444b-85c2-7f6ea9444c90","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"328463d9-f434-48fd-8782-ff4f0233a1bc","source_name":"328463d9-f434-48fd-8782-ff4f0233a1bc","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"2b0d8f7e-ea1e-47ef-8d24-95f47eb6c1e0","source_name":"2b0d8f7e-ea1e-47ef-8d24-95f47eb6c1e0","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"21bd079e-225b-4c29-83f4-3e7646f9873c","source_name":"21bd079e-225b-4c29-83f4-3e7646f9873c","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"82b73795-769c-4d76-b746-da3607921944","source_name":"82b73795-769c-4d76-b746-da3607921944","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"64c3e35c-1043-4fb7-8283-244b80285e64","source_name":"64c3e35c-1043-4fb7-8283-244b80285e64","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"2d55970b-27d0-4128-bdfc-eda586d56ffc","source_name":"2d55970b-27d0-4128-bdfc-eda586d56ffc","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"a06a075a-a4df-44fc-9765-488985634dc6","source_name":"a06a075a-a4df-44fc-9765-488985634dc6","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"1fbe7109-f0ae-4d70-a9b7-3a871717af66","source_name":"1fbe7109-f0ae-4d70-a9b7-3a871717af66","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"9461fa72-2580-4ac7-941f-5cda0941092d","source_name":"9461fa72-2580-4ac7-941f-5cda0941092d","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"d9286a52-8b23-4b5f-8bba-82f3ee41644a","source_name":"d9286a52-8b23-4b5f-8bba-82f3ee41644a","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"bccd8929-51fa-4220-b0fd-a1466830cef6","source_name":"bccd8929-51fa-4220-b0fd-a1466830cef6","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"155f9f7a-2afd-47e0-843a-faa7e7cc8b58","source_name":"155f9f7a-2afd-47e0-843a-faa7e7cc8b58","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"109fd165-3986-4e48-8706-f1eb03d9546b","source_name":"109fd165-3986-4e48-8706-f1eb03d9546b","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"2331379a-1279-48d1-8dcf-8aabb38df290","source_name":"2331379a-1279-48d1-8dcf-8aabb38df290","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"de640733-49b5-4f16-bd8a-ad523f7c791c","source_name":"de640733-49b5-4f16-bd8a-ad523f7c791c","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"5145eb24-f44e-45d2-8957-1a3e19b4ddc9","source_name":"5145eb24-f44e-45d2-8957-1a3e19b4ddc9","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"22d3c59d-0313-42ee-affd-b4865c38e84e","source_name":"22d3c59d-0313-42ee-affd-b4865c38e84e","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"675c0b81-d3b0-4860-9069-5b0d80378c2f","source_name":"675c0b81-d3b0-4860-9069-5b0d80378c2f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"0c955f14-60b3-4433-8790-222881b61161","source_name":"0c955f14-60b3-4433-8790-222881b61161","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"a6033f48-4fbe-4de0-b08e-0504ba3d9354","source_name":"a6033f48-4fbe-4de0-b08e-0504ba3d9354","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"07d35a30-067c-4a86-ad16-4ef9e49d978f","source_name":"07d35a30-067c-4a86-ad16-4ef9e49d978f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"c1700486-989b-4115-8fe6-496f3a0bac51","source_name":"c1700486-989b-4115-8fe6-496f3a0bac51","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"4657a369-7e81-44ff-8b26-27e92e7108a1","source_name":"4657a369-7e81-44ff-8b26-27e92e7108a1","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"a695e6d4-2a10-471f-b317-24c8cb2793c1","source_name":"a695e6d4-2a10-471f-b317-24c8cb2793c1","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"081218b1-bc41-46a7-aa94-436303f9875b","source_name":"081218b1-bc41-46a7-aa94-436303f9875b","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"71b58153-e166-465d-9efc-3857090517ea","source_name":"71b58153-e166-465d-9efc-3857090517ea","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"88ab5e06-3923-470b-9ed3-a655ad3bef5f","source_name":"88ab5e06-3923-470b-9ed3-a655ad3bef5f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"95a8c195-2256-4e46-ad2d-68180870e486","source_name":"95a8c195-2256-4e46-ad2d-68180870e486","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"a35f8197-d189-4435-ac51-247e8d6aacbe","source_name":"a35f8197-d189-4435-ac51-247e8d6aacbe","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"bc9ff52c-e80c-4538-ad93-5429cfdf8bd2","source_name":"bc9ff52c-e80c-4538-ad93-5429cfdf8bd2","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"c839066f-db1b-4d33-8a36-b038dab36b96","source_name":"c839066f-db1b-4d33-8a36-b038dab36b96","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"c1bfd053-f06c-4080-b0c8-7aab85f47f6e","source_name":"c1bfd053-f06c-4080-b0c8-7aab85f47f6e","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"c1bfd053-f06c-4080-b0c8-7aab85f47f6e","source_name":"c1bfd053-f06c-4080-b0c8-7aab85f47f6e","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"c839066f-db1b-4d33-8a36-b038dab36b96","source_name":"c839066f-db1b-4d33-8a36-b038dab36b96","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"bc9ff52c-e80c-4538-ad93-5429cfdf8bd2","source_name":"bc9ff52c-e80c-4538-ad93-5429cfdf8bd2","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"a35f8197-d189-4435-ac51-247e8d6aacbe","source_name":"a35f8197-d189-4435-ac51-247e8d6aacbe","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"95a8c195-2256-4e46-ad2d-68180870e486","source_name":"95a8c195-2256-4e46-ad2d-68180870e486","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"88ab5e06-3923-470b-9ed3-a655ad3bef5f","source_name":"88ab5e06-3923-470b-9ed3-a655ad3bef5f","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"71b58153-e166-465d-9efc-3857090517ea","source_name":"71b58153-e166-465d-9efc-3857090517ea","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"081218b1-bc41-46a7-aa94-436303f9875b","source_name":"081218b1-bc41-46a7-aa94-436303f9875b","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"a695e6d4-2a10-471f-b317-24c8cb2793c1","source_name":"a695e6d4-2a10-471f-b317-24c8cb2793c1","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"4657a369-7e81-44ff-8b26-27e92e7108a1","source_name":"4657a369-7e81-44ff-8b26-27e92e7108a1","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"9d21d81e-37ef-4ccd-9903-4db9477b1286","source_name":"9d21d81e-37ef-4ccd-9903-4db9477b1286","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"dbb3989f-b9ae-433f-a8c2-1a784294e8d0","source_name":"dbb3989f-b9ae-433f-a8c2-1a784294e8d0","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"197f4547-6642-49ac-bc32-56b042579e26","source_name":"197f4547-6642-49ac-bc32-56b042579e26","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"e335224b-6b5d-4fab-b5f3-f7be06b61ad2","source_name":"e335224b-6b5d-4fab-b5f3-f7be06b61ad2","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"87f95950-ceab-4474-b1b2-1e9e66fc2c74","source_name":"87f95950-ceab-4474-b1b2-1e9e66fc2c74","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"ad38b4c6-ef86-4714-b8ec-1d60a0c387d2","source_name":"ad38b4c6-ef86-4714-b8ec-1d60a0c387d2","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"7e91aa69-d6fb-4c22-95fd-efe53876b44c","source_name":"7e91aa69-d6fb-4c22-95fd-efe53876b44c","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"19e82c76-c9c2-4483-b41b-0149167816bc","source_name":"19e82c76-c9c2-4483-b41b-0149167816bc","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"2a444758-6704-4406-9d11-a220b1f65301","source_name":"2a444758-6704-4406-9d11-a220b1f65301","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"6c3af2c7-0d84-4769-9636-d45a96d800e5","source_name":"6c3af2c7-0d84-4769-9636-d45a96d800e5","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"1f702f20-349b-4e29-b0f0-e4edb2bb9f14","source_name":"1f702f20-349b-4e29-b0f0-e4edb2bb9f14","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"544f1080-80d7-4788-b7d0-be0333592cba","source_name":"544f1080-80d7-4788-b7d0-be0333592cba","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"03036b27-e01e-40d3-851c-146a2088a08e","source_name":"03036b27-e01e-40d3-851c-146a2088a08e","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"ff655a74-5d66-4820-b617-6b307e6a37b2","source_name":"ff655a74-5d66-4820-b617-6b307e6a37b2","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"ebd47e6b-c191-48ad-a298-932f678d1d0d","source_name":"ebd47e6b-c191-48ad-a298-932f678d1d0d","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"0da069a9-7c9c-4ec7-8a3d-be7ca53d61ff","source_name":"0da069a9-7c9c-4ec7-8a3d-be7ca53d61ff","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"138e4f82-9160-4410-be9c-27a54b5879c0","source_name":"138e4f82-9160-4410-be9c-27a54b5879c0","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"fbda56f6-8b7a-4c41-a146-58e747f9b668","source_name":"fbda56f6-8b7a-4c41-a146-58e747f9b668","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"b3f20dd9-fc9f-410f-a021-cb9b4b1cc9fe","source_name":"b3f20dd9-fc9f-410f-a021-cb9b4b1cc9fe","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"e6e4446f-8a79-41bd-b88e-cce153b6204c","source_name":"e6e4446f-8a79-41bd-b88e-cce153b6204c","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"b8b74bec-cc87-431f-85f8-46e277944bdc","source_name":"b8b74bec-cc87-431f-85f8-46e277944bdc","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"f19f044e-f9ad-413c-8b21-75231323eb89","source_name":"f19f044e-f9ad-413c-8b21-75231323eb89","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"8bf84646-426d-418e-943c-44bd0cdaba07","source_name":"8bf84646-426d-418e-943c-44bd0cdaba07","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"d545896b-1930-4be7-9cc9-91522e1f5f87","source_name":"d545896b-1930-4be7-9cc9-91522e1f5f87","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"35fe6722-d7d1-450b-a41b-b9493334cd18","source_name":"35fe6722-d7d1-450b-a41b-b9493334cd18","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"0bed052d-203b-48f0-a183-b7eeaf6cd4a4","source_name":"0bed052d-203b-48f0-a183-b7eeaf6cd4a4","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"e057e08c-e354-444b-85c2-7f6ea9444c90","source_name":"e057e08c-e354-444b-85c2-7f6ea9444c90","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"328463d9-f434-48fd-8782-ff4f0233a1bc","source_name":"328463d9-f434-48fd-8782-ff4f0233a1bc","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"2b0d8f7e-ea1e-47ef-8d24-95f47eb6c1e0","source_name":"2b0d8f7e-ea1e-47ef-8d24-95f47eb6c1e0","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"21bd079e-225b-4c29-83f4-3e7646f9873c","source_name":"21bd079e-225b-4c29-83f4-3e7646f9873c","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"82b73795-769c-4d76-b746-da3607921944","source_name":"82b73795-769c-4d76-b746-da3607921944","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"64c3e35c-1043-4fb7-8283-244b80285e64","source_name":"64c3e35c-1043-4fb7-8283-244b80285e64","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"2d55970b-27d0-4128-bdfc-eda586d56ffc","source_name":"2d55970b-27d0-4128-bdfc-eda586d56ffc","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"a06a075a-a4df-44fc-9765-488985634dc6","source_name":"a06a075a-a4df-44fc-9765-488985634dc6","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"1fbe7109-f0ae-4d70-a9b7-3a871717af66","source_name":"1fbe7109-f0ae-4d70-a9b7-3a871717af66","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"9461fa72-2580-4ac7-941f-5cda0941092d","source_name":"9461fa72-2580-4ac7-941f-5cda0941092d","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"d9286a52-8b23-4b5f-8bba-82f3ee41644a","source_name":"d9286a52-8b23-4b5f-8bba-82f3ee41644a","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"bccd8929-51fa-4220-b0fd-a1466830cef6","source_name":"bccd8929-51fa-4220-b0fd-a1466830cef6","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"155f9f7a-2afd-47e0-843a-faa7e7cc8b58","source_name":"155f9f7a-2afd-47e0-843a-faa7e7cc8b58","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"109fd165-3986-4e48-8706-f1eb03d9546b","source_name":"109fd165-3986-4e48-8706-f1eb03d9546b","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"2331379a-1279-48d1-8dcf-8aabb38df290","source_name":"2331379a-1279-48d1-8dcf-8aabb38df290","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"de640733-49b5-4f16-bd8a-ad523f7c791c","source_name":"de640733-49b5-4f16-bd8a-ad523f7c791c","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"5145eb24-f44e-45d2-8957-1a3e19b4ddc9","source_name":"5145eb24-f44e-45d2-8957-1a3e19b4ddc9","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"22d3c59d-0313-42ee-affd-b4865c38e84e","source_name":"22d3c59d-0313-42ee-affd-b4865c38e84e","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"675c0b81-d3b0-4860-9069-5b0d80378c2f","source_name":"675c0b81-d3b0-4860-9069-5b0d80378c2f","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"0c955f14-60b3-4433-8790-222881b61161","source_name":"0c955f14-60b3-4433-8790-222881b61161","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"a6033f48-4fbe-4de0-b08e-0504ba3d9354","source_name":"a6033f48-4fbe-4de0-b08e-0504ba3d9354","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"07d35a30-067c-4a86-ad16-4ef9e49d978f","source_name":"07d35a30-067c-4a86-ad16-4ef9e49d978f","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"c1700486-989b-4115-8fe6-496f3a0bac51","source_name":"c1700486-989b-4115-8fe6-496f3a0bac51","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"c1bfd053-f06c-4080-b0c8-7aab85f47f6e","source_name":"c1bfd053-f06c-4080-b0c8-7aab85f47f6e","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"c839066f-db1b-4d33-8a36-b038dab36b96","source_name":"c839066f-db1b-4d33-8a36-b038dab36b96","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"bc9ff52c-e80c-4538-ad93-5429cfdf8bd2","source_name":"bc9ff52c-e80c-4538-ad93-5429cfdf8bd2","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"a35f8197-d189-4435-ac51-247e8d6aacbe","source_name":"a35f8197-d189-4435-ac51-247e8d6aacbe","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"95a8c195-2256-4e46-ad2d-68180870e486","source_name":"95a8c195-2256-4e46-ad2d-68180870e486","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"88ab5e06-3923-470b-9ed3-a655ad3bef5f","source_name":"88ab5e06-3923-470b-9ed3-a655ad3bef5f","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"71b58153-e166-465d-9efc-3857090517ea","source_name":"71b58153-e166-465d-9efc-3857090517ea","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"081218b1-bc41-46a7-aa94-436303f9875b","source_name":"081218b1-bc41-46a7-aa94-436303f9875b","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"a695e6d4-2a10-471f-b317-24c8cb2793c1","source_name":"a695e6d4-2a10-471f-b317-24c8cb2793c1","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"4657a369-7e81-44ff-8b26-27e92e7108a1","source_name":"4657a369-7e81-44ff-8b26-27e92e7108a1","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"9d21d81e-37ef-4ccd-9903-4db9477b1286","source_name":"9d21d81e-37ef-4ccd-9903-4db9477b1286","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"dbb3989f-b9ae-433f-a8c2-1a784294e8d0","source_name":"dbb3989f-b9ae-433f-a8c2-1a784294e8d0","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"197f4547-6642-49ac-bc32-56b042579e26","source_name":"197f4547-6642-49ac-bc32-56b042579e26","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"e335224b-6b5d-4fab-b5f3-f7be06b61ad2","source_name":"e335224b-6b5d-4fab-b5f3-f7be06b61ad2","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"87f95950-ceab-4474-b1b2-1e9e66fc2c74","source_name":"87f95950-ceab-4474-b1b2-1e9e66fc2c74","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"ad38b4c6-ef86-4714-b8ec-1d60a0c387d2","source_name":"ad38b4c6-ef86-4714-b8ec-1d60a0c387d2","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"7e91aa69-d6fb-4c22-95fd-efe53876b44c","source_name":"7e91aa69-d6fb-4c22-95fd-efe53876b44c","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"19e82c76-c9c2-4483-b41b-0149167816bc","source_name":"19e82c76-c9c2-4483-b41b-0149167816bc","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"2a444758-6704-4406-9d11-a220b1f65301","source_name":"2a444758-6704-4406-9d11-a220b1f65301","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"6c3af2c7-0d84-4769-9636-d45a96d800e5","source_name":"6c3af2c7-0d84-4769-9636-d45a96d800e5","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"1f702f20-349b-4e29-b0f0-e4edb2bb9f14","source_name":"1f702f20-349b-4e29-b0f0-e4edb2bb9f14","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"544f1080-80d7-4788-b7d0-be0333592cba","source_name":"544f1080-80d7-4788-b7d0-be0333592cba","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"03036b27-e01e-40d3-851c-146a2088a08e","source_name":"03036b27-e01e-40d3-851c-146a2088a08e","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"ff655a74-5d66-4820-b617-6b307e6a37b2","source_name":"ff655a74-5d66-4820-b617-6b307e6a37b2","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"ebd47e6b-c191-48ad-a298-932f678d1d0d","source_name":"ebd47e6b-c191-48ad-a298-932f678d1d0d","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"0da069a9-7c9c-4ec7-8a3d-be7ca53d61ff","source_name":"0da069a9-7c9c-4ec7-8a3d-be7ca53d61ff","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"138e4f82-9160-4410-be9c-27a54b5879c0","source_name":"138e4f82-9160-4410-be9c-27a54b5879c0","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"fbda56f6-8b7a-4c41-a146-58e747f9b668","source_name":"fbda56f6-8b7a-4c41-a146-58e747f9b668","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"b3f20dd9-fc9f-410f-a021-cb9b4b1cc9fe","source_name":"b3f20dd9-fc9f-410f-a021-cb9b4b1cc9fe","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"e6e4446f-8a79-41bd-b88e-cce153b6204c","source_name":"e6e4446f-8a79-41bd-b88e-cce153b6204c","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"b8b74bec-cc87-431f-85f8-46e277944bdc","source_name":"b8b74bec-cc87-431f-85f8-46e277944bdc","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"f19f044e-f9ad-413c-8b21-75231323eb89","source_name":"f19f044e-f9ad-413c-8b21-75231323eb89","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"8bf84646-426d-418e-943c-44bd0cdaba07","source_name":"8bf84646-426d-418e-943c-44bd0cdaba07","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"d545896b-1930-4be7-9cc9-91522e1f5f87","source_name":"d545896b-1930-4be7-9cc9-91522e1f5f87","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"35fe6722-d7d1-450b-a41b-b9493334cd18","source_name":"35fe6722-d7d1-450b-a41b-b9493334cd18","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"0bed052d-203b-48f0-a183-b7eeaf6cd4a4","source_name":"0bed052d-203b-48f0-a183-b7eeaf6cd4a4","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"e057e08c-e354-444b-85c2-7f6ea9444c90","source_name":"e057e08c-e354-444b-85c2-7f6ea9444c90","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"328463d9-f434-48fd-8782-ff4f0233a1bc","source_name":"328463d9-f434-48fd-8782-ff4f0233a1bc","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"2b0d8f7e-ea1e-47ef-8d24-95f47eb6c1e0","source_name":"2b0d8f7e-ea1e-47ef-8d24-95f47eb6c1e0","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"21bd079e-225b-4c29-83f4-3e7646f9873c","source_name":"21bd079e-225b-4c29-83f4-3e7646f9873c","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"82b73795-769c-4d76-b746-da3607921944","source_name":"82b73795-769c-4d76-b746-da3607921944","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"64c3e35c-1043-4fb7-8283-244b80285e64","source_name":"64c3e35c-1043-4fb7-8283-244b80285e64","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"2d55970b-27d0-4128-bdfc-eda586d56ffc","source_name":"2d55970b-27d0-4128-bdfc-eda586d56ffc","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"a06a075a-a4df-44fc-9765-488985634dc6","source_name":"a06a075a-a4df-44fc-9765-488985634dc6","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"1fbe7109-f0ae-4d70-a9b7-3a871717af66","source_name":"1fbe7109-f0ae-4d70-a9b7-3a871717af66","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"9461fa72-2580-4ac7-941f-5cda0941092d","source_name":"9461fa72-2580-4ac7-941f-5cda0941092d","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"d9286a52-8b23-4b5f-8bba-82f3ee41644a","source_name":"d9286a52-8b23-4b5f-8bba-82f3ee41644a","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"bccd8929-51fa-4220-b0fd-a1466830cef6","source_name":"bccd8929-51fa-4220-b0fd-a1466830cef6","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"155f9f7a-2afd-47e0-843a-faa7e7cc8b58","source_name":"155f9f7a-2afd-47e0-843a-faa7e7cc8b58","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"109fd165-3986-4e48-8706-f1eb03d9546b","source_name":"109fd165-3986-4e48-8706-f1eb03d9546b","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"2331379a-1279-48d1-8dcf-8aabb38df290","source_name":"2331379a-1279-48d1-8dcf-8aabb38df290","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"de640733-49b5-4f16-bd8a-ad523f7c791c","source_name":"de640733-49b5-4f16-bd8a-ad523f7c791c","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"5145eb24-f44e-45d2-8957-1a3e19b4ddc9","source_name":"5145eb24-f44e-45d2-8957-1a3e19b4ddc9","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"22d3c59d-0313-42ee-affd-b4865c38e84e","source_name":"22d3c59d-0313-42ee-affd-b4865c38e84e","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"675c0b81-d3b0-4860-9069-5b0d80378c2f","source_name":"675c0b81-d3b0-4860-9069-5b0d80378c2f","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"0c955f14-60b3-4433-8790-222881b61161","source_name":"0c955f14-60b3-4433-8790-222881b61161","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"a6033f48-4fbe-4de0-b08e-0504ba3d9354","source_name":"a6033f48-4fbe-4de0-b08e-0504ba3d9354","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"07d35a30-067c-4a86-ad16-4ef9e49d978f","source_name":"07d35a30-067c-4a86-ad16-4ef9e49d978f","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"c1700486-989b-4115-8fe6-496f3a0bac51","source_name":"c1700486-989b-4115-8fe6-496f3a0bac51","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"9d21d81e-37ef-4ccd-9903-4db9477b1286","source_name":"9d21d81e-37ef-4ccd-9903-4db9477b1286","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","source_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","source_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"dbb3989f-b9ae-433f-a8c2-1a784294e8d0","source_name":"dbb3989f-b9ae-433f-a8c2-1a784294e8d0","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"197f4547-6642-49ac-bc32-56b042579e26","source_name":"197f4547-6642-49ac-bc32-56b042579e26","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"e335224b-6b5d-4fab-b5f3-f7be06b61ad2","source_name":"e335224b-6b5d-4fab-b5f3-f7be06b61ad2","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"87f95950-ceab-4474-b1b2-1e9e66fc2c74","source_name":"87f95950-ceab-4474-b1b2-1e9e66fc2c74","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","source_name":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"ad38b4c6-ef86-4714-b8ec-1d60a0c387d2","source_name":"ad38b4c6-ef86-4714-b8ec-1d60a0c387d2","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"7e91aa69-d6fb-4c22-95fd-efe53876b44c","source_name":"7e91aa69-d6fb-4c22-95fd-efe53876b44c","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"19e82c76-c9c2-4483-b41b-0149167816bc","source_name":"19e82c76-c9c2-4483-b41b-0149167816bc","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"2a444758-6704-4406-9d11-a220b1f65301","source_name":"2a444758-6704-4406-9d11-a220b1f65301","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"6c3af2c7-0d84-4769-9636-d45a96d800e5","source_name":"6c3af2c7-0d84-4769-9636-d45a96d800e5","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"1f702f20-349b-4e29-b0f0-e4edb2bb9f14","source_name":"1f702f20-349b-4e29-b0f0-e4edb2bb9f14","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"544f1080-80d7-4788-b7d0-be0333592cba","source_name":"544f1080-80d7-4788-b7d0-be0333592cba","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"03036b27-e01e-40d3-851c-146a2088a08e","source_name":"03036b27-e01e-40d3-851c-146a2088a08e","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"ff655a74-5d66-4820-b617-6b307e6a37b2","source_name":"ff655a74-5d66-4820-b617-6b307e6a37b2","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"ebd47e6b-c191-48ad-a298-932f678d1d0d","source_name":"ebd47e6b-c191-48ad-a298-932f678d1d0d","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"0da069a9-7c9c-4ec7-8a3d-be7ca53d61ff","source_name":"0da069a9-7c9c-4ec7-8a3d-be7ca53d61ff","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"138e4f82-9160-4410-be9c-27a54b5879c0","source_name":"138e4f82-9160-4410-be9c-27a54b5879c0","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"fbda56f6-8b7a-4c41-a146-58e747f9b668","source_name":"fbda56f6-8b7a-4c41-a146-58e747f9b668","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"b3f20dd9-fc9f-410f-a021-cb9b4b1cc9fe","source_name":"b3f20dd9-fc9f-410f-a021-cb9b4b1cc9fe","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"e6e4446f-8a79-41bd-b88e-cce153b6204c","source_name":"e6e4446f-8a79-41bd-b88e-cce153b6204c","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"b8b74bec-cc87-431f-85f8-46e277944bdc","source_name":"b8b74bec-cc87-431f-85f8-46e277944bdc","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"f19f044e-f9ad-413c-8b21-75231323eb89","source_name":"f19f044e-f9ad-413c-8b21-75231323eb89","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"8bf84646-426d-418e-943c-44bd0cdaba07","source_name":"8bf84646-426d-418e-943c-44bd0cdaba07","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"d545896b-1930-4be7-9cc9-91522e1f5f87","source_name":"d545896b-1930-4be7-9cc9-91522e1f5f87","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"35fe6722-d7d1-450b-a41b-b9493334cd18","source_name":"35fe6722-d7d1-450b-a41b-b9493334cd18","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"0bed052d-203b-48f0-a183-b7eeaf6cd4a4","source_name":"0bed052d-203b-48f0-a183-b7eeaf6cd4a4","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"e057e08c-e354-444b-85c2-7f6ea9444c90","source_name":"e057e08c-e354-444b-85c2-7f6ea9444c90","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"328463d9-f434-48fd-8782-ff4f0233a1bc","source_name":"328463d9-f434-48fd-8782-ff4f0233a1bc","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"2b0d8f7e-ea1e-47ef-8d24-95f47eb6c1e0","source_name":"2b0d8f7e-ea1e-47ef-8d24-95f47eb6c1e0","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"21bd079e-225b-4c29-83f4-3e7646f9873c","source_name":"21bd079e-225b-4c29-83f4-3e7646f9873c","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"82b73795-769c-4d76-b746-da3607921944","source_name":"82b73795-769c-4d76-b746-da3607921944","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"64c3e35c-1043-4fb7-8283-244b80285e64","source_name":"64c3e35c-1043-4fb7-8283-244b80285e64","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"2d55970b-27d0-4128-bdfc-eda586d56ffc","source_name":"2d55970b-27d0-4128-bdfc-eda586d56ffc","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"a06a075a-a4df-44fc-9765-488985634dc6","source_name":"a06a075a-a4df-44fc-9765-488985634dc6","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"1fbe7109-f0ae-4d70-a9b7-3a871717af66","source_name":"1fbe7109-f0ae-4d70-a9b7-3a871717af66","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"9461fa72-2580-4ac7-941f-5cda0941092d","source_name":"9461fa72-2580-4ac7-941f-5cda0941092d","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"d9286a52-8b23-4b5f-8bba-82f3ee41644a","source_name":"d9286a52-8b23-4b5f-8bba-82f3ee41644a","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"bccd8929-51fa-4220-b0fd-a1466830cef6","source_name":"bccd8929-51fa-4220-b0fd-a1466830cef6","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"155f9f7a-2afd-47e0-843a-faa7e7cc8b58","source_name":"155f9f7a-2afd-47e0-843a-faa7e7cc8b58","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"109fd165-3986-4e48-8706-f1eb03d9546b","source_name":"109fd165-3986-4e48-8706-f1eb03d9546b","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"2331379a-1279-48d1-8dcf-8aabb38df290","source_name":"2331379a-1279-48d1-8dcf-8aabb38df290","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"de640733-49b5-4f16-bd8a-ad523f7c791c","source_name":"de640733-49b5-4f16-bd8a-ad523f7c791c","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"5145eb24-f44e-45d2-8957-1a3e19b4ddc9","source_name":"5145eb24-f44e-45d2-8957-1a3e19b4ddc9","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"22d3c59d-0313-42ee-affd-b4865c38e84e","source_name":"22d3c59d-0313-42ee-affd-b4865c38e84e","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"675c0b81-d3b0-4860-9069-5b0d80378c2f","source_name":"675c0b81-d3b0-4860-9069-5b0d80378c2f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"0c955f14-60b3-4433-8790-222881b61161","source_name":"0c955f14-60b3-4433-8790-222881b61161","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"a6033f48-4fbe-4de0-b08e-0504ba3d9354","source_name":"a6033f48-4fbe-4de0-b08e-0504ba3d9354","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"07d35a30-067c-4a86-ad16-4ef9e49d978f","source_name":"07d35a30-067c-4a86-ad16-4ef9e49d978f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"c1700486-989b-4115-8fe6-496f3a0bac51","source_name":"c1700486-989b-4115-8fe6-496f3a0bac51","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"4657a369-7e81-44ff-8b26-27e92e7108a1","source_name":"4657a369-7e81-44ff-8b26-27e92e7108a1","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"a695e6d4-2a10-471f-b317-24c8cb2793c1","source_name":"a695e6d4-2a10-471f-b317-24c8cb2793c1","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"081218b1-bc41-46a7-aa94-436303f9875b","source_name":"081218b1-bc41-46a7-aa94-436303f9875b","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"71b58153-e166-465d-9efc-3857090517ea","source_name":"71b58153-e166-465d-9efc-3857090517ea","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"88ab5e06-3923-470b-9ed3-a655ad3bef5f","source_name":"88ab5e06-3923-470b-9ed3-a655ad3bef5f","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"95a8c195-2256-4e46-ad2d-68180870e486","source_name":"95a8c195-2256-4e46-ad2d-68180870e486","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"a35f8197-d189-4435-ac51-247e8d6aacbe","source_name":"a35f8197-d189-4435-ac51-247e8d6aacbe","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"bc9ff52c-e80c-4538-ad93-5429cfdf8bd2","source_name":"bc9ff52c-e80c-4538-ad93-5429cfdf8bd2","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"c839066f-db1b-4d33-8a36-b038dab36b96","source_name":"c839066f-db1b-4d33-8a36-b038dab36b96","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"c1bfd053-f06c-4080-b0c8-7aab85f47f6e","source_name":"c1bfd053-f06c-4080-b0c8-7aab85f47f6e","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""}]
//       var datasource1 = [{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e801","source_name":"80d75aa0-880d-47d0-b403-14fc1460e801","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e802","source_name":"80d75aa0-880d-47d0-b403-14fc1460e802","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e803","source_name":"80d75aa0-880d-47d0-b403-14fc1460e803","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e801","source_name":"60d75aa0-880d-47d0-b403-14fc1460e801","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e802","source_name":"60d75aa0-880d-47d0-b403-14fc1460e802","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e803","source_name":"60d75aa0-880d-47d0-b403-14fc1460e803","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"","rel_type":""},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e803","source_name":"80d75aa0-880d-47d0-b403-14fc1460e803","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e801","target_name":"80d75aa0-880d-47d0-b403-14fc1460e801","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e802","source_name":"80d75aa0-880d-47d0-b403-14fc1460e802","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e801","target_name":"80d75aa0-880d-47d0-b403-14fc1460e801","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e801","source_name":"80d75aa0-880d-47d0-b403-14fc1460e801","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e801","target_name":"80d75aa0-880d-47d0-b403-14fc1460e801","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e803","source_name":"80d75aa0-880d-47d0-b403-14fc1460e803","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e802","target_name":"80d75aa0-880d-47d0-b403-14fc1460e802","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e802","source_name":"80d75aa0-880d-47d0-b403-14fc1460e802","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e802","target_name":"80d75aa0-880d-47d0-b403-14fc1460e802","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e801","source_name":"80d75aa0-880d-47d0-b403-14fc1460e801","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e802","target_name":"80d75aa0-880d-47d0-b403-14fc1460e802","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e803","source_name":"80d75aa0-880d-47d0-b403-14fc1460e803","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e803","target_name":"80d75aa0-880d-47d0-b403-14fc1460e803","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e802","source_name":"80d75aa0-880d-47d0-b403-14fc1460e802","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e803","target_name":"80d75aa0-880d-47d0-b403-14fc1460e803","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e801","source_name":"80d75aa0-880d-47d0-b403-14fc1460e801","source_type":"Main Entity","target_uid":"80d75aa0-880d-47d0-b403-14fc1460e803","target_name":"80d75aa0-880d-47d0-b403-14fc1460e803","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e801","source_name":"60d75aa0-880d-47d0-b403-14fc1460e801","source_type":"Main Entity","target_uid":"60d75aa0-880d-47d0-b403-14fc1460e801","target_name":"60d75aa0-880d-47d0-b403-14fc1460e801","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e802","source_name":"60d75aa0-880d-47d0-b403-14fc1460e802","source_type":"Main Entity","target_uid":"60d75aa0-880d-47d0-b403-14fc1460e802","target_name":"60d75aa0-880d-47d0-b403-14fc1460e802","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e803","source_name":"60d75aa0-880d-47d0-b403-14fc1460e803","source_type":"Main Entity","target_uid":"60d75aa0-880d-47d0-b403-14fc1460e803","target_name":"60d75aa0-880d-47d0-b403-14fc1460e803","target_type":"Main Entity","rel_type":"rel"},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e801","source_name":"80d75aa0-880d-47d0-b403-14fc1460e801","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e802","source_name":"80d75aa0-880d-47d0-b403-14fc1460e802","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"80d75aa0-880d-47d0-b403-14fc1460e803","source_name":"80d75aa0-880d-47d0-b403-14fc1460e803","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e801","source_name":"60d75aa0-880d-47d0-b403-14fc1460e801","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e802","source_name":"60d75aa0-880d-47d0-b403-14fc1460e802","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""},{"match_uid":"","source_uid":"60d75aa0-880d-47d0-b403-14fc1460e803","source_name":"60d75aa0-880d-47d0-b403-14fc1460e803","source_type":"Main Entity","target_uid":"","target_name":"","target_type":"Main Entity","rel_type":""}];

 var datasource1={"nodeGuid":"4e02be06-77b5-4be6-a6dc-4481911a6222","forElasticSearch":[{"match_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_labelsArray":"faastNode,labelB","target_labelsArray":"faastNode,labelA","source_type":"Main Entity","target_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","target_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","target_type":"Main Entity","rel_type":"rel","rel_count":1}],"forExpand":[{"match_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","source_labelsArray":"faastNode,labelB","target_labelsArray":"faastNode,labelA","source_type":"Main Entity","target_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","target_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","target_type":"Main Entity","rel_type":"rel","rel_count":1}]}
// var datasource2={"nodeGuid":"1d38df85-e37b-4e8f-8358-80c99e336b52","forElasticSearch":[{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4}],"forExpand":[{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4}]}

        currentSelectNode = datasource1;
         var nodeLabels = currentSelectNode.forElasticSearch;
                            keyNode = currentSelectNode.nodeGuid;
                            currentNodeAction = "expandChild";
//                      nodeLabels=nodeLabels.concat(datasource2.forElasticSearch)
                            renderModularNetwork('#networkChart', nodeLabels, dataMapping2, inputControlsNetwork)
//        renderModularNetwork('#networkChart', datasource1, dataMapping2, inputControlsNetwork);

 function renderModularNetwork(componentSelector, dataSource, dataMapping, inputControls) {
 console.log("12313131")
console.log(dataSource)
        for (var objgid in dataSource) {
            objGuids.push({ "match_guid": dataSource[objgid].match_uid, "source_guid": dataSource[objgid].source_uid, "target_guid": dataSource[objgid].target_uid })
        }
        //console.log('guids', objGuids);
        if (inputControls.plotArea.test == 0) {
            // inputControls.plotArea.focal_entity.filter_value = document.getElementById('search').value;
        }

        // Function to get the aggregation type from the dataMapping object
        getAggregation = function(aggVar) {
            if (dataMapping[aggVar].aggType) {
                return dataMapping[aggVar].aggType;
            } else {
                return defaultAggType;
            }
        };

        // Initilize data mapping
        var catVar1 = dataMapping.catVar1.mappedValue;
        var catVar2 = dataMapping.catVar2.mappedValue;
        var catVar3 = dataMapping.catVar3.mappedValue;
        var catVar4 = dataMapping.catVar4.mappedValue;
        var catVar5 = dataMapping.catVar5.mappedValue;
        var catVar6 = dataMapping.catVar6.mappedValue;
        var quantVar1 = dataMapping.quantVar1.mappedValue;
        var sourceName = dataMapping.sourceName.mappedValue;
        var targetName = dataMapping.targetName.mappedValue;
        var defaultAggType = 'min';

        var quantVar1aggType = getAggregation('quantVar1');


        // Data staging
        if (!inputControls.plotArea.focal_entity.filter_value == '') {
            var dataSourcefiltered = []
            for (var i = 0; i < dataSource.length; i++) {
                if (dataSource[i]['source_name'] === inputControls.plotArea.focal_entity.filter_value || dataSource[i]['target_name'] === inputControls.plotArea.focal_entity.filter_value) {
                    dataSourcefiltered.push(dataSource[i]);
                }
            }
            dataSource = dataSourcefiltered
        };

        //Link
        //Select only desired keys
        var links = $.map(dataSource, function(d) { return { "source": d[catVar1], "target": d[catVar2], "match_score": d[quantVar1], "match_id": d[catVar3], 'link_type': d[catVar6] }; }); //"match_group": d[catVar3],

        //Sort links by source, then target
        links.sort(function(a, b) {
            if (a.source > b.source) { return 1; } else if (a.source < b.source) { return -1; } else {
                if (a.target > b.target) { return 1; }
                if (a.target < b.target) { return -1; } else { return 0; }
            }
        });

        //Any links with duplicate source and target get an incremented 'linknum'
        for (var i = 0; i < links.length; i++) {
            if (i != 0 &&
                links[i].source == links[i - 1].source &&
                links[i].target == links[i - 1].target) {
                links[i].linknum = links[i - 1].linknum + 1;
            } else { links[i].linknum = 1; };
        };


        //Remove link when name is null
        for (i = 0; i < links.length; ++i) {
            if (links[i].source == '' || links[i].target == '') {
                links.splice(i--, 1);
            }
        }

        for (var i = 0; i < links.length; i++) {
            for (var j = i + 1; j < links.length; j++) {
                if (links[i].source == links[j].target) {
                    links[j].inversion = 'Yes'
                }
            }
        }

        //Node
        //Select both target and source
        var nodes_source = $.map(dataSource, function(d) { return { "catVar1": d[catVar1], "quantVar1aggType": d[quantVar1], "catVar4": d[catVar4],"name": d[sourceName]}; });
        var nodes_target = $.map(dataSource, function(d) { return { "catVar1": d[catVar2], "quantVar1aggType": d[quantVar1], "catVar4": d[catVar5],"name": d[targetName]  }; });
        //Append
        Array.prototype.push.apply(nodes_source, nodes_target);

        //Remove when name is null
        for (i = 0; i < nodes_source.length; ++i) {
            if (nodes_source[i].catVar1 == '') {
                nodes_source.splice(i--, 1);
            }
        }

        //Nest node
        var stagedData = d3.nest();
        stagedData.key(function(d, i) { return d.catVar1; })
        stagedData = stagedData.rollup(function(group) {
            return {
                count: group.length,
                min: d3.min(group, function(d) { return +d.quantVar1aggType; }),
                max: d3.max(group, function(d) { return +d.quantVar1aggType; }),
                sum: d3.sum(group, function(d) { return +d.quantVar1aggType; }),
                avg: d3.mean(group, function(d) { return +d.quantVar1aggType; }),
                stdDev: d3.deviation(group, function(d) { return +d.quantVar1aggType; }),
                variance: d3.variance(group, function(d) { return +d.quantVar1aggType; }),
                median: d3.median(group, function(d) { return +d.quantVar1aggType; }),
                allValues: d3.values(group),
            };
        })
            .entries(nodes_source);


        // Get compoentSelector container size
        var svgWidth = $(componentSelector).width();
        var svgHeight = $(componentSelector).height();


        var componentSVG = d3.select(componentSelector + ' svg');
        if (!document.querySelector(componentSelector + '>svg')) {
            componentSVG =
                d3.select(componentSelector).append('svg')
                    .style('width', svgWidth + 'px')
                    .style('height', svgHeight + 'px')

            componentSVG
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .style("fill", "none")
                .style("pointer-events", "all");
        }

        var renderPlotArea = componentSVG.select('.plotArea');
        if (!document.querySelector(componentSelector + '>svg>.plotArea')) {
            renderPlotArea = componentSVG.append('g').attr('class', 'plotArea')
        }
        renderPlotArea.call(d3.zoom()
            .translateExtent([
                [-inputControls.plotArea.initialScale.attr.transformX * svgWidth, -inputControls.plotArea.initialScale.attr.transformY * svgHeight],
                [svgWidth, svgHeight]
            ])
            .scaleExtent([inputControls.plotArea.initialScale.attr.scale, inputControls.plotArea.zoom.zoom_in])
            .on("zoom", zoomed));
        if (inputControls.plotArea.initialScale.status == 'On') {
            renderPlotArea.attr("transform", "translate(-" + (inputControls.plotArea.initialScale.attr.transformX * svgWidth) + ",-" + (inputControls.plotArea.initialScale.attr.transformY * svgHeight) + ") scale(" + inputControls.plotArea.initialScale.attr.scale + ")");
        }
        if (inputControls.plotArea.arrow.status == 'On') {

            renderPlotArea.append("defs").append("marker")
                .attr("id", "arrow")
                .attr("viewBox", "0 -5 10 10")
                .attrs(inputControls.plotArea.arrow.attr)
                .styles(inputControls.plotArea.arrow.style)
                .attr('refX','46')
                .append("svg:path")
                .attr('d', 'M 0,-5 L 10 ,0 L 0,5');
        }

        var color = d3.scaleOrdinal()
            .domain(function(d) { return stagedData.map(function(d) { return d.value.allValues[0].catVar4; }) })
            .range(inputControls.plotArea.color.colorScaleCategories);

        //  .force("charge", d3.forceManyBody().strength(-1200))
        //             .alpha(0.8)

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.key; }).distance(105))
            .force("charge", d3.forceManyBody().strength(-100))
            .alpha(0.2)
            .force("center", d3.forceCenter(svgWidth / inputControls.plotArea.location_plot.width, svgHeight / inputControls.plotArea.location_plot.height))
            .force("y", d3.forceY(0))
            .force("x", d3.forceX(0));

        d3.selectAll('.nodes').remove()
        d3.selectAll('.lines').remove()
        d3.selectAll('.labelText').remove()

        if (inputControls.plotArea.link == 'curve') {
            var link = renderPlotArea.append("g").attr("class", "lines")
                .selectAll(".link")
                .data(links)
                .enter()
                .append("path")
                .attr("class", "links")
                .attr('stroke', inputControls.plotArea.link_attr.stroke)
                .attr('stroke-dasharray', inputControls.plotArea.link_attr['stroke-dasharray'])
                .attr("stroke-width", 1)
                .attr("id", function(d, i) { return "linkId_" + i; })
                .attr("marker-end", "url(#arrow)");


            // link.append("text")
            //     .attr("font-family", "Arial, Helvetica, sans-serif")
            //     .attr("fill", "Black")
            //     .style("font", "normal 12px Arial")
            //     .attr("transform", function(d) {
            //         //getSourceAndTargetPosition(d);
            //         return "translate(" +
            //             ((d.source.y + d.target.y)/2) + "," +
            //             ((d.source.x + d.target.x)/2) + ")";
            //     })
            //     .attr("dy", ".35em")
            //     .attr("text-anchor", "middle")
            //     .text(
            //         'test'
            //     );
            if (inputControls.plotArea.labelText.status == 'On') {
                /*var text = renderPlotArea.append('g').attr("class", "labels")
                    .selectAll(".labelText")
                    .data(links)
                    .enter().append("text")
                    .attr("class", "labelText")
                    .attrs(inputControls.plotArea.labelText.attr)
                    .styles(inputControls.plotArea.labelText.style)
                    //.append("textPath")
                    .attr("xlink:href", function(d, i) { return "#linkId_" + i; })
                    .style("font-size", "12px")
                    .text(function(d) { return d.link_type; });*/
                //show relationship type on the line
                var text = renderPlotArea.append('g').attr("class", "labels")
                    .selectAll(".labelText")
                    .data(links)
                    .enter().append("text")
                    .attr("class", "labelText")
                    .attrs(inputControls.plotArea.labelText.attr)
                    .styles(inputControls.plotArea.labelText.style)
                    .append("textPath")
                    .attr("xlink:href", function(d, i) { return "#linkId_" + i; })
                    .style("font-size", "3px")
                    .text(function(d) { return d.link_type; })
            }

        } else {
            var link = renderPlotArea.append("g").attr("class", "lines")
                .selectAll(".line")
                .data(links)
                .enter()
                .append("line")
                .attr("class", "link")
                .attr('stroke', inputControls.plotArea.link_attr.stroke)
                .attr('stroke-dasharray', inputControls.plotArea.link_attr['stroke-dasharray'])
                .attr("stroke-width", 1)
                .attr("id", function(d, i) { return "linkId_" + i; })
                .attr("marker-end", "url(#arrow)");
          d3.select()
        }
        var rightclik = d3.tip()
            .attr('class', 'd3-tip')
            .offset([20, 70])
            .html(function (d) {
                    var data = getTargetData(d.key);
                    console.log(data.open)
                    var propStr = '<div class="content" id="xx">' +
                        '<table style="margin-bottom: 0px" class="table table-hover">' +
                        '<thead><tr><th>Property Name </th><th>Property Value</th></tr></thead>'+
                        '<tbody>' +
                        '<tr><td>GUID </td><td>'+data.nodeGuid+'</td></tr>' +
                        '<tr><td>Name </td><td>'+data.nodeName+'</td></tr>';
                    if (keyNode === d.key){
                        var labelData = currentSelectNode.forElasticSearch;
                        var labelCount = (labelData!=null && labelData!=undefined)?labelData.length: 'N/A';
                        propStr += '<tr><td>Labels Count </td><td>'+labelCount+'</td></tr>';
                    }
//                    if (currentNodeAction === "expandChild" && data.rel_count!=null && data.rel_count!=undefined){
//                        propStr += '<tr><td>Relationships Count</td><td>'+data.rel_count+'</td></tr>';
//                    }
//                    if (data.props != null && data.props != undefined){
//                        for (key in data.props){
//                            propStr += '<tr><td>' + key + '</td><td>' + data.props[key] + '</td></tr>';
//                        }
//                    }
                    propStr += '</tbody></table></div>';
                    if (currentNodeAction=="expandChild"&&data.open == 1){
                       propStr += '<div class="content table-responsive" id="rightMenu">' +
                           '<table style="margin-bottom: 0px" class="table table-hover">' +
                           '<tbody>' +
                           '<tr><td data-Id="'+d.key+'"data-index="'+d.index+'" style="font-weight: bold">Actions2</td></tr>' +
                           //'<tr><td data-Id="'+d.key+'"data-index="'+d.index+'" id="expandChildren" style="color:red">Expand Children</td></tr>' +
                           '<tr><td data-Id="'+d.key+'"data-index="'+d.index+'" id="hideChildren" style="color:red;">Hide Children</td></tr>' +
                           '</tbody>' +
                           '</table>'+
                           '</div>';
                    }else if(currentNodeAction=="expandChild"&&data.open != 1){
                        propStr += '<div class="content table-responsive" id="rightMenu">' +
                            '<table style="margin-bottom: 0px" class="table table-hover">' +
                            '<tbody>' +
                            '<tr><td data-Id="'+d.key+'"data-index="'+d.index+'" style="font-weight: bold">Actions</td></tr>' +
                            '<tr><td data-Id="'+d.key+'"data-index="'+d.index+'" id="expandChildren" style="color:red">Expand Children</td></tr>' +
                            //'<tr><td data-Id="'+d.key+'"data-index="'+d.index+'" id="hideChildren" style="color:red;display:none">Hide Children</td></tr>' +
                            '</tbody>' +
                            '</table>'+
                            '</div>';
                    }
                    //console.log(propStr);
                    return propStr;


            }) ;
        componentSVG.call(rightclik);
        $('.d3-tip').off('mouseenter').off('mouseleave');
        $('.d3-tip').on('mouseenter',function(){clearTimeout(tipHideTimeout)})
            .on('mouseleave',function(e){$(this).css('opacity','0').css('pointer-events','none')});

        var tipHideTimeout,tipShowTimeout;
        var node = renderPlotArea.append("g")
            .attr("class", "nodes")
            .selectAll(".node")
            .data(stagedData)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            .on('click', function() {
                globalClick = d3.select(this).datum();
                // getNodesById(globalClick.key);
            })
            /*.on('mouseenter',function (d ) {
                event.preventDefault();
                var entity_type=d3.select(this).select("circle").attr("class");
                if(entity_type==="main_entity"){
                    currentlyNode = d3.select(this).datum();
                    console.log(d3.select(this).datum());
                    rightclik.show(d);
                }

            })*/
            .on('mouseover',function (d) {
                var context = this;
                var args = [].slice.call(arguments);
                args.push(this);
                clearTimeout(tipHideTimeout);

                tipShowTimeout = setTimeout(function() {
                    rightclik.show.apply(context, args);
                    //event.preventDefault();
                    var entity_type=d3.select(context).select("circle").attr("class");
                    if(entity_type==="main_entity"){
                        currentlyNode = d3.select(context).datum();
                        console.log(d3.select(context).datum());
                        rightclik.show(d);
                    }

                }, 600);
            }).on('mouseleave', function(d){
                clearTimeout(tipShowTimeout)
                clearTimeout(tipHideTimeout);
                tipHideTimeout=setTimeout(rightclik.hide,400,d);
            })
        $("body").on( "click" ,function (e) {
             rightclik.hide();
        })

        $(document).on("click","#expandChildren",function () {
            var selectGuid = $(this).attr("data-Id");
            var forExpandData = "";


 var datasource2={"nodeGuid":"1d38df85-e37b-4e8f-8358-80c99e336b52","forElasticSearch":[{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4}],"forExpand":[{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481952a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_name":"4e02be06-77b5-4be6-3322-4481911a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6222","target_type":"Main Entity","rel_type":"rel","rel_count":4},{"match_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_uid":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_name":"1d38df85-e37b-4e8f-8358-80c99e336b52","source_labelsArray":"faastNode,labelA","target_labelsArray":"faastNode,labelB","source_type":"Main Entity","target_uid":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_name":"4e02be06-77b5-4be6-a6dc-4481911a6a0f","target_type":"Main Entity","rel_type":"rel","rel_count":4}]}
           var temp = datasource2;
                            if (temp.forElasticSearch == null || temp.forElasticSearch == undefined){
                                tools.showError("Cannot get the data for single node with labels!")
                            }else{
                                var nodeLabels = temp.forElasticSearch;

                                keyNode = temp.nodeGuid;
                                currentNodeAction = "expandChild";
                                dataSource=dataSource.concat(nodeLabels);
                                currentSelectNode.forElasticSearch=dataSource;

                                currentSelectNode.forExpand=currentSelectNode.forExpand.concat(temp.forExpand);
                                for(var i=0;i<dataSource.length;i++){
                                    if(dataSource[i].target_uid==selectGuid)
                                    dataSource[i].open="1";
                                }
                                 console.log("2333333333333")
                                console.log(dataSource)
                                renderModularNetwork('#networkChart', dataSource, dataMapping2, inputControlsNetwork)

                            }
//                            currentNodeAction = "expandChild";
//                      dataSource=dataSource.concat(datasource2.forElasticSearch)
//
//            renderModularNetwork(componentSelector, dataSource, dataMapping, inputControls)


            /*if (selectGuid == currentSelectNode.nodeGuid){
                forExpandData = currentSelectNode.forExpand;
            }
            if (forExpandData!=null && forExpandData!="" && forExpandData.length>0){
                //$("#hideChildren")[0].style.display = "block";
                //$("#expandChildren")[0].style.display ="none";

                currentNodeAction = "expandChild";
                renderModularNetwork('#networkChart', forExpandData, dataMapping2, inputControlsNetwork);
                //$("#hideChildren").show();
                //$("#expandChildren").hide();
            }else{
                tools.showWarning("Can not find the child nodes!");
            }*/
        })
        $(document).on("click","#hideChildren",function () {
            var selectGuid = $(this).attr("data-Id");
            var forElasticSearchData = "";
//             selectGuid="1d38df85-e37b-4e8f-8358-80c99e336b52";
                       var temp=[];
            temp.push(selectGuid)
            while(temp.length>0){
           var  tempGuid=temp.shift();
                 for(var i=0;i<dataSource.length;i++){
                    if(dataSource[i].target_uid==selectGuid){
                        continue;
                    }
                    if(dataSource[i].source_uid==tempGuid){
                        temp.push(dataSource[i].target_uid);
                        dataSource.splice(i,1);
                        i--;
                    }
             }

            }
             currentNodeAction = "expandChild";
                   for(var i=0;i<dataSource.length;i++){
                                    if(dataSource[i].target_uid==selectGuid)
                                    dataSource[i].open="0";
                                }
       renderModularNetwork(componentSelector, dataSource, dataMapping, inputControls)
            /*if (selectGuid == currentSelectNode.nodeGuid){
                forElasticSearchData = currentSelectNode.forElasticSearch;
            }
            if (forElasticSearchData!=null && forElasticSearchData!="" && forElasticSearchData.length>0){

                currentNodeAction = "showLabel";
                renderModularNetwork('#networkChart', forElasticSearchData, dataMapping2, inputControlsNetwork);
            }else{
                tools.showWarning("Can not find node with labels!");
            }*/
        })
        /*d3.select(componentSelector+">svg").on( "click" ,function (e) {
         if(d3.select(this).attr("class")!='d3-tip')  {
         rightclik.hide();
         }

         })*/
        function expandChild() {
            /*alert("expand");
            $(".child_entity").parent().show();
            $("[id^='linkId']").show();*/
        }
        function hideChildren() {
            /*alert("hide");
            $(".child_entity").parent().hide();
            $("[id^='linkId']").hide();*/
        }
        function getTargetData(globalKey){

            var nodeData = [];
            var data;
            if (currentNodeAction === "defaultChart"){
                nodeData = defaultNodeList;
            }else if (currentNodeAction === "expandChild"){
                nodeData = currentSelectNode.forExpand;
            }else if (currentNodeAction === "showLabel"){
                nodeData = currentSelectNode.forElasticSearch;
            }
             nodeData=dataSource;
            console.log("999999999")
             console.log(nodeData)
            if (nodeData != null && nodeData != undefined && nodeData.length>0){
                for(var i=0; i < nodeData.length; i++){
                    if(globalKey === nodeData[i].source_uid){
                        data = {
                            'nodeGuid' : nodeData[i].source_uid,
                            'nodeName' : nodeData[i].source_name,
                            'nodeType' : nodeData[i].source_type,
                            'open' : nodeData[i].open
                        }
                        var props = {};
                        for (var key in nodeData[i]){
                            if (currentNodeAction==="defaultChart" && isProperty(key, null)){
                                props[key] = nodeData[i][key];
                            }
                            if ((currentNodeAction==="expandChild" || currentNodeAction==="showLabel") && isProperty(key, "source_")){
                                props[key.substring(7)] = nodeData[i][key];
                            }
                            if (currentNodeAction==="expandChild" && key === 'rel_count'){
                                data[key] = nodeData[i][key];
                            }
                        }
                        data['props'] = props;
                        break;
                    }else if(globalKey === nodeData[i].target_uid){
                        data = {
                            'nodeGuid' : nodeData[i].target_uid,
                            'nodeName' : nodeData[i].target_name,
                            'nodeType' : nodeData[i].target_type,
                            'open' : nodeData[i].open
                        }
                        var props = {};
                        for (var key in nodeData[i]){
                            if (currentNodeAction==="defaultChart" && isProperty(key, null)){
                                props[key] = nodeData[i][key];
                            }
                            if ((currentNodeAction==="expandChild" || currentNodeAction==="showLabel") && isProperty(key, "target_")){
                                props[key.substring(7)] = nodeData[i][key];
                            }
                        }
                        data['props'] = props;
                        break;
                    }
                }
            }
            return data;
        }

        function isProperty(key, beginStr){
            if (key === 'match_uid' || key === 'source_uid' || key === 'source_name' || key === 'source_type' || key === 'target_uid' || key === 'target_name' || key === 'target_type' || key === 'rel_type'){
                return false;
            }
            if (beginStr != null){
                if (key.indexOf(beginStr)!==-1){
                    return true;
                }
            }else{
                return true;
            }
            return false;
        }
        function getmaxLength(stagedData2){
            var data = stagedData2;
            var maxLength = [];
            for(var i=0; i < data.length; i++){
                maxLength.push(data[i].length);
            }
            return Math.max.apply(null, maxLength);
        }
        node.append("circle")
            .attr("x", "10")
            // .attr("r", function(d){ return getmaxLength(stagedData.map(function(d) { return d.key; })) - 4;})
            .attr("r", function(d) { return inputControls.plotArea.node.radius;})
            .attr("fill", function(d) { return color(d.value.allValues[0].catVar4); })
            .attr("class", function(d) {
                if(d.value.allValues[0].catVar4==='Main Entity'){return "main_entity";}else{ return "child_entity";}
            })


        if (inputControls.plotArea.nodeText.status == 'On') {
            node.append("text")
                .text(function(d) {return (d.value.allValues[0]&&d.value.allValues[0]["name"])?d.value.allValues[0]["name"]: d.key })
                .attr("text-anchor", "middle")
                .attrs(inputControls.plotArea.nodeText.attr)
                .styles(inputControls.plotArea.nodeText.style)
                .style("fill", function(d){ if(d.value.allValues[0].catVar4 === "Main Entity") return 'white'; else return 'black';})
                .style("font-size", "3px")
        }


        var stagedData2 = stagedData.map(function(d) { return d.key; });
        $(function() {
            var $searchBox = $("#search")
            $searchBox.autocomplete({
                source: stagedData2
            });
        });



        //tooltip
        link.append("title")
            .text(function(d) { return d.link_type; /*'Relation Name: ' + d.link_type;*/ })

        //simulation
        simulation
            .nodes(stagedData)
            .on("tick", ticked);

        simulation
            .force("link")
            .links(links);

        inputControls.plotArea.focal_entity.filter_value = ''

        function zoomed() {
            //Commented
            //renderPlotArea.attr("transform", d3.event.transform);
        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(inputControls.plotArea.alphaTarget.start).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(inputControls.plotArea.alphaTarget.end);
            d.fx = null;
            d.fy = null;
        }

        function positionNode(d) {
            return "translate(" + d.x / inputControls.plotArea.location_node.width + "," + d.y / inputControls.plotArea.location_node.height + ")";
        }

        function ticked() {
            if (inputControls.plotArea.link == 'curve') {
                link.attr("d", positionLink);
                node.attr("transform", positionNode);
            } else {
                link.attr("x1", function(d) { return d.source.x / inputControls.plotArea.location_node.width; })
                    .attr("y1", function(d) { return d.source.y / inputControls.plotArea.location_node.height; })
                    .attr("x2", function(d) { return d.target.x / inputControls.plotArea.location_node.width; })
                    .attr("y2", function(d) { return d.target.y / inputControls.plotArea.location_node.height; });
                node.attr("cx", function(d) { return d.x / inputControls.plotArea.location_node.width; })
                    .attr("cy", function(d) { return d.y / inputControls.plotArea.location_node.height; });

                node.attr("transform", positionNode);
            }
        }

        if (inputControls.plotArea.link == 'curve') {
            function positionLink(d) {
                if (d.linknum == 1 && d.inversion != 'Yes') {
                    var dr = 0
                } else {
                    var dr = 75 / d.linknum;
                }
                return "M" + d.source.x / inputControls.plotArea.location_node.width + "," + d.source.y / inputControls.plotArea.location_node.height + "A" + dr + "," + dr + " 0 0,1 " + d.target.x / inputControls.plotArea.location_node.width + "," + d.target.y / inputControls.plotArea.location_node.height;
            }
        }
        //hideChildren();
    };
})