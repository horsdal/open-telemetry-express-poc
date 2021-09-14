const {LogLevel, ExportResult, hrTimeToMicroseconds} = require("@opentelemetry/core");
exports.MyConsoleSpanExporter = class MyConsoleSpanExporter {
    /**
     * Export spans.
     * @param spans
     * @param resultCallback
     */
    export(spans, resultCallback) {
        return this._sendSpans(spans, resultCallback);
    }

    /**
     * Shutdown the exporter.
     */
    shutdown() {
        this._sendSpans([]);
        return Promise.resolve();
    }

    /**
     * converts span info into more readable format
     * @param span
     */
    _exportInfo(span) {
        return {
            message: span.name,
            logLevel: LogLevel.DEBUG,
            context: {
                traceId: span.spanContext.traceId,
                parentId: span.parentSpanId,
                id: span.spanContext.spanId,
                kind: span.kind,
                timestamp: hrTimeToMicroseconds(span.startTime),
                duration: hrTimeToMicroseconds(span.duration),
                attributes: span.attributes,
                status: span.status,
                events: span.events,
            }
        };
    }

    /**
     * Showing spans in console
     * @param spans
     * @param done
     */
    _sendSpans(spans, done) {
        for (const span of spans) {
            console.debug('OpenTelemetry trace:', this._exportInfo(span));
        }
        if (done) {
            return done(ExportResult.SUCCESS);
        }
    }
}
