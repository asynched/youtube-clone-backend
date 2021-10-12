# Simple youtube clone

A simple youtube clone concept

## Application flow

![Application diagram](https://mermaid.ink/img/eyJjb2RlIjogIlxuc2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IENsaWVudFxuICBwYXJ0aWNpcGFudCBGcm9udGVuZFxuICBwYXJ0aWNpcGFudCBWaWRlb1BsYXllclxuICBwYXJ0aWNpcGFudCBCYWNrZW5kXG5cbiAgQ2xpZW50IC0+PiBGcm9udGVuZDogR0VUIC9pbmRleC5odG1sXG4gIEZyb250ZW5kIC0+PiBCYWNrZW5kOiBHRVQgL3ZpZGVvLzppZFxuICBCYWNrZW5kIC0+PiBGcm9udGVuZDogVmlkZW8gaW5mb3JtYXRpb24gLSBIVFRQIDIwMFxuICBGcm9udGVuZCAtPj4gVmlkZW9QbGF5ZXI6IFZpZGVvIFVSTFxuICBWaWRlb1BsYXllciAtPj4gQmFja2VuZDogR0VUIC92aWRlby9tZWRpYS86aWRcbiAgbG9vcCBWaWRlbyBzdHJlYW1cbiAgICBCYWNrZW5kIC0pIFZpZGVvUGxheWVyOiBWaWRlbyBjaHVuayAtIEhUVFAgMjA2XG4gIGVuZFxuIn0=)

[//]: # '```mermaid'
[//]: # 'sequenceDiagram'
[//]: # '  participant Client'
[//]: # '  participant Frontend'
[//]: # '  participant VideoPlayer'
[//]: # '  participant Backend'
[//]: # '  Client ->> Frontend: GET /index.html'
[//]: # '  Frontend ->> Backend: GET /video/:id'
[//]: # '  Backend ->> Frontend: Video information - HTTP 200'
[//]: # '  Frontend ->> VideoPlayer: Video URL'
[//]: # '  VideoPlayer ->> Backend: GET /video/media/:id'
[//]: # '  loop Video stream'
[//]: # '    Backend -) VideoPlayer: Video chunk - HTTP 206'
[//]: # '  end'
[//]: # '```'

## Author

| ![Eder Lima](https://github.com/Nxrth-x.png?size=100) |
| ----------------------------------------------------- |
| [Eder Lima](https://github.com/Nxrth-x)               |
