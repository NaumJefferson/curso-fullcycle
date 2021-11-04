FROM golang:1.7 as build

WORKDIR /go/src

COPY . ./
RUN go build -ldflags "-s -w" app.go

FROM scratch
WORKDIR /app
COPY --from=build /go/src/app ./
CMD ["./app"]